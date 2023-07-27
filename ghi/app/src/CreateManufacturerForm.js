import React, { useState } from "react";

function ManufacturerForm({ getManufacturers }) {
    const [name, setName] = useState('');

    const handleNameChange = event => {
        const value = event.target.value;
        setName(value)
    }
    const handleSubmit = async event => {
        event.preventDefault()
        const data = {
            name: name
        }
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer)

            setName('');
            getManufacturers();
        }
    }
    return (
<div className="=row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
                <h1>Add a Manufacturer</h1>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Manufacturer Name" required type="text" id="name" name="name" className="form-control"/>
                    <label htmlFor="manufacturerName">Manufacturer Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</div>
    )

}
export default ManufacturerForm
