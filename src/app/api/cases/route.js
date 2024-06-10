import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

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
    
    const {title, description, solution} = await request.json();


    const result = await pool.query('INSERT INTO cases SET ?', {
        title,
        description,
        solution
    })

    
    return NextResponse.json({
        title,
        description,
        solution,
        id: result.insertId,
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message: error.message
    },
{
    status: 500,
})
  }
};