import React from 'react';

function TechnicianList({technicians}) {
    return (
        <div className="container" id="formDiv">
            <h1>Technicians</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Technicians</th>
                        <th>Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician, id) => {
                        return (
                            <tr key={id}>
                                <td>{technician.name}</td>
                                <td>{technician.employee_number}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TechnicianList;
