import React, { useState } from 'react';

function TechnicianForm({fetchTechnicians}) {
    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleEmployeeNumberChange = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.employee_number = employeeNumber;

        const Url = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(Url, fetchConfig);
        if (response.ok) {
            setName('');
            setEmployeeNumber('');
            fetchTechnicians();
        }
    };

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4" id="formDiv">
            <h1 className="text-center">Add A New Technician</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                required type="text"
                name="name"
                id="name"
                className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                value={employeeNumber}
                onChange={handleEmployeeNumberChange}
                placeholder="Employee Number"
                required type="number"
                name="employee_number"
                id="employee_number"
                className="form-control"
                />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default TechnicianForm;
