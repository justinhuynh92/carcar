import React, { useEffect, useState } from 'react';

function AutoForm() {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [modelId, setModelId] = useState('');
    const [models, setModels] = useState([]);

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleModelIdChange = (event) => {
        const value = event.target.value;
        setModelId(value);
    }
    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        const data = await response.json();
        setModels(data.models);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = modelId;

        const Url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(Url, fetchConfig);

        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModelId('');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Automobile</h1>
                    <form
                        onSubmit={handleSubmit}
                        id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input
                            onChange={handleColorChange}
                            placeholder="Color"
                            required type="text"
                            value={color} name="color"
                            id="color"
                            className="form-control"/>
                        <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={handleYearChange}
                            placeholder="Year"
                            required type="number"
                            value={year} name="year"
                            id="year"
                            className="form-control"/>
                        <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={handleVinChange}
                            placeholder="Vin"
                            required type="text"
                            value={vin}
                            name="vin"
                            id="vin"
                            className="form-control"/>
                        <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select
                            onChange={handleModelIdChange}
                            value={modelId}
                            name="model"
                            id="model"
                            className="form-select">
                            <option>Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutoForm;
