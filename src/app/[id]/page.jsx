import axios from "axios";
import Buttons from "./Buttons";

//página de caso
async function loadCase(caseId) {
  const { data } = await axios.get("http://localhost:3000/api/cases/" + caseId);
  return data;
}

async function CasePage({ params }) {
  const caso = await loadCase(params.id);
  console.log(caso);

  return (
  <div className="p-6 bg-white text-black rounded">
    <h1 className="text-5xl font-bold mb-6 px-2">{caso.title}</h1>
    <p className="border-solid rounded mb-6 px-4">{caso.description}</p>
    <h2 className="text-3xl font-bold mb-6 px-2">Solución:</h2>
    <p className="border-solid rounded bg-slate-300 py-2 px-4 mb-6">{caso.solution}</p>
    <Buttons casoId={caso.id} />
  </div>
  );
}

export default CasePage;
