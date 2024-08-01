import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";
import {writeFile} from 'fs/promises';
import path from "path";

export async function GET(){

    try {
        const results = await pool.query('SELECT * FROM cases')
        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500,
        })
    }
};

export async function POST(request){

  try {
    
    const data = await request.formData();
    const image = data.get('image')

    if (!data.get('name')){
        return NextResponse.json(
            {
                message: "El titulo es requerido"
            },
            {
                status: 400,
            }
        );
    };


    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), 'public', image.name)
    await writeFile(filePath, buffer)

    const result = await pool.query('INSERT INTO cases SET ?', {
        title: data.get('name'),
        description: data.get('description'),
        solution: data.get('solution')
    })

    
    return NextResponse.json({
        title: data.get('name'),
        description: data.get('description'),
        solution: data.get('solution'),
        id: result.insertId,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
        message: error.message
    },
{
    status: 500,
})
  }
};