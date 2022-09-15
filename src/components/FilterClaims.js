import React, { useState } from 'react'
import { STAGES } from '../constants/stages';
import {STATUSES} from '../constants/statuses';

const FilterClaims = ({records,setClaims}) => {
    
    const [filterStages, setFilterStages] = useState([])
    const [filterStatuses, setFilterStatuses] = useState([])
    
    
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
            }
            return null;
        })
        setClaims(filteredData);
    }
    
    return (
        <>
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
        </>
    )
}

export default FilterClaims