"use client";
import { setLazyProp } from "next/dist/server/api-utils";
import { useState,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



function CaseForm() {
  const [caso, setcaso] = useState({
    title: "",
    description: "",
    solution: "",
  });

  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setcaso({
      ...caso,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await axios.post('/api/cases', caso)
    console.log(res);
    form.current.reset();
    router.push('/')
  };

  return (
    <form className="border-r-indigo-200 max-w-md shadow-md rounded-md px-8 pt-6 pb-8 mb4"
    onSubmit={handleSubmit}
    ref={form}>
      <label
        htmlFor="title"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Titulo
      </label>
      <input
        name="title"
        type="text"
        placeholder="Ingrese título"
        className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
        onChange={handleChange}
        autoFocus
      />

      <label htmlFor="description">Descripción</label>
      <textarea
        name="description"
        rows={3}
        placeholder="Ingrese Descripción"
        onChange={handleChange}
        className="shadow appearance-none border rounded text-gray-700 w-full  py-2 px-3"
      />

      <label htmlFor="solution">Solución</label>
      <textarea
        name="solution"
        rows={3}
        placeholder="Ingrese Solución"
        onChange={handleChange}
        className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
      />

      <button className="bg-blue-500 hover:bg-blue-700 hover:border-b-neutral-400 text-white font-bold py-4 px-6 mt-4 rounded">
        Guardar Caso
      </button>
    </form>
  );
}

export default CaseForm;
