"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import dynamic from 'next/dynamic';
import CustomImageUpload from "../components/CustomImageUpload"; // Importa CustomImageUpload
import 'react-quill/dist/quill.snow.css';


// Carga dinámica de React Quill para evitar problemas en SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


function CaseForm() {
  const [caso, setCaso] = useState({
    title: "",
    description: "",
    solution: "",
  });

  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  

/*   const handleChange = (e) => {
    setcaso({
      ...caso,
      [e.target.name]: e.target.value,
    });
  }; */

  const handleChange = (e) => {
    setCaso({
      ...caso,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setCaso({
      ...caso,
      description: value,
    });
  };

  const handleSolutionChange = (value) => {
    setCaso({
      ...caso,
      solution: value,
    });
  };



  useEffect(() => {
    if (params.id) {
      axios
        .get("/api/cases/" + params.id)
        .then((res) => {
          setCaso({
            title: res.data.title,
            description: res.data.description,
            solution: res.data.solution,
          });
        })
        .catch((error) => {
          console.error("Error al cargar el caso:", error);
        });
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      const formData = new FormData();
      formData.append('name', caso.title);
      formData.append('description', caso.description);
      formData.append('solution', caso.solution);
      if (file) formData.append('image', file);

      if (params.id) {
        res = await axios.put("/api/cases/" + params.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        res = await axios.post("/api/cases", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (res.status === 200) {
        form.current.reset();
        router.refresh();
        router.push("/");
      } else {
        console.error("Error en la actualización del caso", res);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div>
      <form
        className="border-r-cyan-200 shadow-cust-xl rounded-md px-8 pt-6 pb-8 mb4 "
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="title"
          className="block text-slate-300 text-xl font-bold my-5 mx-2"
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

        <label
          htmlFor="description"
          className="block text-slate-300 text-xl font-bold my-5 mx-2"
        >
          Descripción
        </label>

{/*         <textarea
          name="description"
          value={caso.description}
          rows={9}
          placeholder="Ingrese Descripción"
          onChange={handleChange}
          className="shadow appearance-none border rounded text-gray-700 w-full  py-2 px-3"
/> */}

        <CustomImageUpload
          value={caso.description}
          onChange={handleDescriptionChange}
        />

{/*         <ReactQuill
          name="description"
          value={caso.description}
          //placeholder="Ingrese Descripción"
          onChange={handleDescriptionChange}
          className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
        /> */}


        <label
          htmlFor="solution"
          className="block text-slate-300 text-xl font-bold my-5 mx-2"
        >
          Solución
        </label>

        <CustomImageUpload
          value={caso.solution}
          onChange={handleSolutionChange}
        />

{/*         <textarea
          name="solution"
          value={caso.solution}
          rows={9}
          placeholder="Ingrese Solución"
          onChange={handleChange}
          className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
/> */}


{/*         <ReactQuill
          name="solution"
          value={caso.solution}
          //placeholder="Ingrese Solución"
          onChange={handleSolutionChange}
          className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
        />
 */}

        <label
          htmlFor="image"
          className="block text-slate-300 text-xl font-bold mx-2 my-5"
        >
          Imagen
        </label>

        <input
          type="file"
          className="shadow appearance-none border rounded text-gray-700 w-full py-2 px-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 hover:border-b-neutral-400 text-white font-bold py-4 px-6 mt-4 rounded"
        >
          {params.id ? "Actualizar Caso" : "Crear Caso"}
        </button>
      </form>

      <div className="pb-5 pt-5">
      {file && <img 
      className="w-96 object-contain mx-auto"
      src={URL.createObjectURL(file)} alt="" />}
      </div>
    </div>
  );
}

export default CaseForm;
