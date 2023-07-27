import React, { useState, useEffect } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);
    const fetchTechnicians = async () => {
        const Url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(Url)

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchTechnicians();
    }, []);

    return (
        <div className="container" id="formDiv">
            <h1>Technicians</h1>
            <table className="table table-striped">
                <thead>
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
