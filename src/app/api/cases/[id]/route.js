import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM cases WHERE id = ?", [
      params.id,
    ]);

    if (result.length == 0) {
      return NextResponse.json(
        {
          message: "Caso no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
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

export async function DELETE(request, { params }) {
  try {
    const result = await pool.query("DELETE FROM cases WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "Caso no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    console.log(result);

    return new Response(null, { status: 204 });
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

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();

    if (!data.get("name")){
      return NextResponse.json(
        {
          message: "Título es requerido",
        },
      {
        status: 400,
      }
      );
    }

    if (!data.get("image")) {
      return NextResponse.json(
        {
          message: "Imagen es requerida",
        },
        {
          status: 400,
        }
      );
    };


    const result = await pool.query("UPDATE cases SET ? WHERE id = ?", [
      {
        name: data.get("name"),
        description: data.get("description"),
        solution: data.get("solution"),
      },
      params.id,
    ]);

    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "Caso no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedCase = await pool.query(
      "SELECT * FROM cases WHERE id = ?",[params.id]
    );

    return NextResponse.json(updatedCase[0]);
  } catch (error) {
    console.error("Error en PUT /api/cases/:id", error);
    return NextResponse.json(
      {
        message: "Error interno del servidor",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
