import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import ClaimsTable from './components/ClaimsTable';
import FilterClaims from './components/FilterClaims';
import './App.css'

function App() {
  const [records, setRecords] = useState([])
  const [claims, setClaims] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    for (let i = 0; i < document.getElementsByClassName('form-check-input').length; i++) {
      document.getElementsByClassName('form-check-input').item(i).checked = false;
    }
    const getClaimsFromServer = async () => {
      let claimsData = await Axios.get('https://node-patients-records.herokuapp.com/claims')
      setRecords(claimsData.data);
      setClaims(claimsData.data);
    }
    getClaimsFromServer();
    // console.log(claims);
// // console.log(claimsRecord);
//     setClaims(claimsRecord);
    // setFilterStages([STAGES.IA,STAGES.EN,STAGES.DC,STAGES.FA]);
    // setFilterStatuses([STATUSES.PA,STATUSES.TQ])
  }, [refresh])

  // useEffect(() => {
    
  // })
  
  return (
    <div className="App container-fluid">
      <div className='row'>
        <button type="button" id="refresh" className="col-3 btn btn-info" onClick={() => setRefresh(!refresh)}>Refresh</button>
        <FilterClaims records={records} setClaims={setClaims} />
      </div>
      <div className='row table-responsive'>
        <ClaimsTable claims={claims} setClaims={setClaims} />
      </div>
    </div>
  );
}

export default App;
