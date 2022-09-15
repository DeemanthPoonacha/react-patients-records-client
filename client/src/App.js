import { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { STAGES } from './constants/stages';
import {STATUSES} from './constants/statuses';

function App() {
  const [records, setRecords] = useState([])
  const [claims, setClaims] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [order, setOrder] = useState('ASC')
  const [filterStages, setFilterStages] = useState([])
  const [filterStatuses, setFilterStatuses] = useState([])

  useEffect(() => {
    for (let i = 0; i < document.getElementsByClassName('form-check-input').length; i++) {
      document.getElementsByClassName('form-check-input').item(i).checked = false;
    }
    const getClaimsFromServer = async () => {
      let claimsData = await Axios.get('http://localhost:8080/claims')
      setRecords(claimsData.data);
      setClaims(claimsData.data);
    }
    getClaimsFromServer();
    console.log(claims);
// // console.log(claimsRecord);
//     setClaims(claimsRecord);
    // setFilterStages([STAGES.IA,STAGES.EN,STAGES.DC,STAGES.FA]);
    // setFilterStatuses([STATUSES.PA,STATUSES.TQ])
  }, [refresh])

  // useEffect(() => {
    
  // })
  
  const SortOrder = (field) => {
    setOrder(order==='ASC'?'DSC':'ASC')
    let sortedData = claims.sort((a, b) =>
      order === 'ASC' ?
        b[field] > a[field]?1:-1 :
        b[field] < a[field]?1:-1
    );
    setClaims(sortedData);
  }

  const FilterStage = (value, show) => {
    if (show) {
      setFilterStages([...filterStages, value])
    }
    else {
      let fd = filterStages.filter(f => f !== value)
      setFilterStages(fd)
    }
  }

  const FilterStatus = (value, show) => {
    if (show) {
      setFilterStatuses([...filterStatuses, value])
    }
    else {
      let fd = filterStatuses.filter(f => f !== value)
      setFilterStatuses(fd)
    }
  }
  const ApplyFilter = () => {
    let filteredData = records.filter((claim) => {
      if (filterStages.includes(claim.stage)&&filterStatuses.includes(claim.status)) {
        return claim;
      };
    })
    setClaims(filteredData);
  }
  
  return (
    <div className="App container">
      <div className='row'>
        <button type="button" className="col-2 btn btn-primary" onClick={() => setRefresh(!refresh)}>Refresh</button>
        <a className="offset-8 col-2 btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Filter
        </a>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <h3>Stage</h3>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="stageI" onChange={(e)=>{FilterStage(STAGES.IA,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="stageI">{STAGES.IA}</label>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="stageE" onChange={(e)=>{FilterStage(STAGES.EN,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="stageE">{STAGES.EN}</label>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="stageD" onChange={(e)=>{FilterStage(STAGES.DC,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="stageD">{STAGES.DC}</label>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="stageF" onChange={(e)=>{FilterStage(STAGES.FA,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="stageF">{STAGES.FA}</label>
            </div>
            <h3>Status</h3>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="statusP" onChange={(e)=>{FilterStatus(STATUSES.PA,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="statusP">{STATUSES.PA}</label>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="statusT" onChange={(e)=>{FilterStatus(STATUSES.TQ,e.target.checked)}}/>
                <label className="form-check-label" htmlFor="statusT">{STATUSES.TQ}</label>
            </div>
            <button type="button" className="col-2 btn btn-primary" onClick={() => ApplyFilter('stage')}>Apply</button>
          </div>
        </div>
      </div>
      <div className='row'>

      <table className="table table-striped">
        <thead style={{background:'teal',color:'white'}}>
          <tr>
            <th scope="col" onClick={()=>{SortOrder('id')}}>ClaimId</th>
            <th scope="col" onClick={()=>{SortOrder('name')}}>Name</th>
            <th scope="col" onClick={()=>{SortOrder('aliment')}}>Aliment</th>
            <th scope="col" onClick={()=>{SortOrder('sla')}}>SLA</th>
            <th scope="col" onClick={()=>{SortOrder('p_tat')}}>P-TAT</th>
            <th scope="col" onClick={()=>{SortOrder('stage')}}>Stage</th>
            <th scope="col" onClick={()=>{SortOrder('status')}}>Status</th>
            <th scope="col" onClick={()=>{SortOrder('amount') }}>Approved Amount</th>
            <th scope="col" onClick={()=>{SortOrder('hospital')}}>Hospital</th>
          </tr>
        </thead>
        <tbody>
          {claims ?
            claims.map(claim => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.name}</td>
                <td>{claim.aliment}</td>
                <td>{claim.sla}%</td>
                <td>{claim.p_tat}</td>
                <td>{claim.stage}</td>
                <td>{claim.status}</td>
                <td>Rs.{claim.amount}</td>
                <td>{claim.hospital}</td>
              </tr>
            ))
            :null}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
