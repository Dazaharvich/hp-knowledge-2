import { NextResponse } from 'next/server';
import { pool } from '@/libs/mysql';
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const results = await pool.query('SELECT * FROM cases');
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get('image');
    

    console.log("Data received:", data);
    console.log("Image received:", image);

    const name = data.get('name');
    const description = data.get('description');
    const solution = data.get('solution');

    console.log(name);

   if (!name) {
      return NextResponse.json(
        {
          message: "El título es requerido",
        },
        {
          status: 400,
        }
      );
    } 

    if (!description) {
      return NextResponse.json(
        {
          message: "La descripción es requerida",
        },
        {
          status: 400,
        }
      );
    }

    if (!solution) {
      return NextResponse.json(
        {
          message: "La solución es requerida",
        },
        {
          status: 400,
        }
      );
    }

     /* if (!image) {
      return NextResponse.json(
        {
          message: "La imagen es requerida",
        },
        {
          status: 400,
        }
      );
    } 
 */
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), 'public', image.name);
    await writeFile(filePath, buffer);

    const query = 'INSERT INTO cases (title, description, solution) VALUES (?, ?, ?)';
    const values = [name, description, solution];
    const [result] = await pool.query(query, values);

    return NextResponse.json(
      {
        title: name,
        description: description,
        solution: solution,
        id: result.insertId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}