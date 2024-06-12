"use client";
import { useState } from "react";

function ProductForm() {
  const [caso, setcaso] = useState({
    title: "",
    description: "",
    solution: "",
  });

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb4">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Titulo</label>
      <input 
      type="text" 
      placeholder="Ingrese título" 
      className="shadow appearance-none border rounded max-w-md py-2 px-3" onChange={handleChange} />

      <label htmlFor="description">Descripción</label>
      <input
        type="text"
        placeholder="Ingrese Descripción"
        onChange={handleChange}
        className="shadow appearance-none border rounded max-w-md  py-2 px-3"
      />

      <label htmlFor="solution">Solución</label>
      <input
        type="text"
        placeholder="Ingrese Solución"
        onChange={handleChange}
        className="shadow appearance-none border rounded max-w-md py-2 px-3"
      />
    </form>
  );
}

export default ProductForm;
