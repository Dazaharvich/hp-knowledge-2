import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json("Obteniendo caso")
};

export function DELETE() {
    return NextResponse.json("Eliminando caso")
};

export function PUT() {
    return NextResponse.json("Actualizando caso")
};