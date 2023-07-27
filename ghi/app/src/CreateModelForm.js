import React, { useState, useEffect } from "react";

function VehicleModelForm({ getManufacturers, manufacturers, getModels }) {
    const [modelName, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const handleModelNameChange = event => {
        const value = event.target.value;
        setModelName(value)
    }
    const handlePictureUrlChange = event => {
        const value = event.target.value;
        setPictureUrl(value)
    }
    const handleManufacturerChange = event => {
        const value = event.target.value;
        setManufacturer(value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            name: modelName,
            picture_url: pictureUrl,
            manufacturer_id: manufacturer
        }
        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(vehicleModelUrl, fetchConfig);
        if (response.ok) {
            const newVehicleModel = await response.json();
            console.log(newVehicleModel)
            setModelName('');
            setPictureUrl('');
            setManufacturer('');
            getManufacturers();
            getModels();
        }
    }

    return(
        <div className="=row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <h1>Create a Vehicle Model</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleModelNameChange} value={modelName} placeholder="Model Name" required type="text" id="modelName" name="modelName" className="form-control"/>
                            <label htmlFor="modelName">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture URL" required type="url" id="pictureUrl" name="pictureUrl" className="form-control"/>
                            <label htmlFor="pictureUrl">Picture URL</label>
                        </div>
                        <div className="mb-3">
                           <select onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" className="form-select">
                              <option value="">Choose a manufacturer</option>
                              {manufacturers.map( (manufacturer, index) => {
                            return <option key={index} value={manufacturer.manufacturer_id}>{manufacturer.name}</option>
                        })}
                           </select>
                       </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
            )

}
export default VehicleModelForm
