'use client'
import axios from "axios";
import { useRouter } from "next/navigation";

//botones de cada caso
function Buttons({casoId}) {

  const router = useRouter()

  return (
    <div className="flex gap-4 py-5">
    <button className="bg-blue-600 text-white hover:bg-blue-800 py-2 px-3 rounded">Editar</button>
    <button className="bg-red-600 text-white hover:bg-red-800 py-2 px-3 rounded"
      onClick={async ()=>{
        if (confirm('Estás seguro que deseas eliminar este Artículo ??')){
          const res = await axios.delete('/api/cases/' + casoId)
          if (res.status == 204){
            router.push('/')
            router.refresh()

          }
        }
      }}
    >
      Eliminar</button>
</div>
  )
}

export default Buttons