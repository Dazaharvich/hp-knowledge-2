import CaseSearch from "@/components/CaseSearch";
import { pool } from "@/libs/mysql";


//llamado API
async function loadCases() {
  const result = await pool.query('SELECT * FROM cases');
  console.log(result);
};

function HomePage() {

  //loadCases()


  return (
    <div>
      <CaseSearch />
    </div>
  )
}

export default HomePage