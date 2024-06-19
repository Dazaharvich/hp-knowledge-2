"use client";

import { useState,useRef, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";



function CaseForm() {
  const [caso, setcaso] = useState({
    title: "",
    description: "",
    solution: "",
  });

  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setcaso({
      ...caso,
      [e.target.name]: e.target.value
    })
  };

  useEffect(() => {
    if (params.id){
      axios.get('/api/cases/' + params.id)
      .then(res => {
        setcaso({
          title: res.data.title,
          description: res.data.description,
          solution: res.data.solution,
        })
      })
    }

  }, []);
  

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
        value={caso.title}
        placeholder="Ingrese título"
        className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
        onChange={handleChange}
        autoFocus
      />

      <label htmlFor="description">Descripción</label>
      <textarea
        name="description"
        value={caso.description}
        rows={3}
        placeholder="Ingrese Descripción"
        onChange={handleChange}
        className="shadow appearance-none border rounded text-gray-700 w-full  py-2 px-3"
      />

      <label htmlFor="solution">Solución</label>
      <textarea
        name="solution"
        value={caso.solution}
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
