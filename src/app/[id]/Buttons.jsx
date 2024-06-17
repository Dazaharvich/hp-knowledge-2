'use client'

//botones de cada caso
function Buttons() {
  return (
    <div className="flex gap-4 py-5">
    <button className="bg-blue-600 text-white hover:bg-blue-800 py-2 px-3 rounded">Editar</button>
    <button className="bg-red-600 text-white hover:bg-red-800 py-2 px-3 rounded">Eliminar</button>
</div>
  )
}

export default Buttons