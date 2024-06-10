import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(){
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ mesagge: result[0]['NOW()'] });
};