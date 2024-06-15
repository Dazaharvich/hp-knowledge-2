import { pool } from "@/libs/mysql";
import { useState, useEffect } from "react";
import axios from "axios";

//llamado API
async function loadCases() {
  const result = await pool.query('SELECT * FROM cases');
  console.log(result);
};


function HomePage() {
  const [cases, setCases] = useState([]); 
  // definir el estado cases, que almacena los casos obtenidos de la base de datos.
  const [search, setSearch] = useState(''); 
  // definir el estado search, que almacena el término de búsqueda introducido por el usuario.
  
  //llamado a la API
  useEffect(() => {
    axios.get('/api/cases')
      .then(response => setCases(response.data))
      .catch(error => console.error('Error buscando datos:', error));
  }, []);


  //Filtra los casos según el término de búsqueda
  const filteredCases = cases.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  
  loadCases()


  return (
    <div>
      
    </div>
  )
}

export default HomePage