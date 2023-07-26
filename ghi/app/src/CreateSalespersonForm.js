import React, { useState } from "react";

function SalespersonForm({ getSalespersons }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = event => {
        const value = event.target.value;
        setFirstName(value)
    }
    const handleLastNameChange = event => {
        const value = event.target.value
        setLastName(value)
    }
    const handleEmployeeIdChange = event => {
        const value = event.target.value
        setEmployeeId(value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            employee_id: employeeId
        }
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);

            setFirstName('');
            setLastName('');
            setEmployeeId('');
            getSalespersons();
        }

    }

    return(
<div className="=row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit} id="create-salesperson-form">
                <h1>Add a Salesperson</h1>
                <div className="form-floating mb-3">
                    <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="firstName" name="firstName" className="form-control"/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="lastName" name="lastName" className="form-control"/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEmployeeIdChange} value={employeeId} placeholder="Employee ID" required type="text" id="employeeId" name="employeeId" className="form-control"/>
                    <label htmlFor="employeeId">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</div>
    )
}

export default SalespersonForm
