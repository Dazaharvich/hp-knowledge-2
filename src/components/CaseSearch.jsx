"use client";
/* import { pool } from "@/libs/mysql"; */
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

//componente busqueda de casos

function CaseSearch() {
  const [cases, setCases] = useState([]);
  // definir el estado cases, que almacena los casos obtenidos de la base de datos.
  const [search, setSearch] = useState("");
  // definir el estado search, que almacena el término de búsqueda introducido por el usuario.

  //llamado a la API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cases")
      .then((response) => setCases(response.data))
      .catch((error) => console.error("Error buscando datos:", error));
  }, []);

  //Filtra los casos según el término de búsqueda
  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Busqueda de casos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 py-2 px-2 rounded text-black"
        />
      </div>
      <div>
        {/* Render de los resultados de busqueda */}
        <div className="grid gap-6 grid-cols-2 py-5">
          {filteredCases.map((c) => (
            <Link
              key={c.id}
              className="bg-white text-black rounded-lg 
            border-gray-800 mb-3 px-4 py-4 hover:bg-gray-200 hover:cursor-pointer"
              href={`/${c.id}`}
            >
              <h2 className="text-3xl font-bold">{c.title}</h2>
              <p>{c.description}</p>
              <p>
                <strong>Solution:</strong> {c.solution}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CaseSearch;
