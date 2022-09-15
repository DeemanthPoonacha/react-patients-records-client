import React, { useState } from 'react'

const ClaimsTable = ({claims,setClaims}) => {
    const [order, setOrder] = useState('ASC');
    
    const SortOrder = (field) => {
        setOrder(order==='ASC'?'DSC':'ASC')
        let sortedData = claims.sort((a, b) =>
        order === 'ASC' ?
            b[field] > a[field]?1:-1 :
            b[field] < a[field]?1:-1
        );
        setClaims(sortedData);
    }
  
    return (
        <>  
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
        </>
    )
}

export default ClaimsTable