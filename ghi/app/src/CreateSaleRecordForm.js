import React, { useState, useEffect } from "react";

function SaleRecordForm({ getSales }) {
    //add more stuff...customers, salespersons & auto vin state arrays to add to form for dropdowns
    const [auto, setAuto] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutoChange = event => {
        const value = event.target.value;
        setAuto(value)
    }
    const handleSalespersonChange = event => {
        const value = event.target.value;
        setSalesperson(value)
    }
    const handleCustomerChange = event => {
        const value = event.target.value;
        setCustomer(value)
    }
    const handlePriceChange = event => {
        const value = event.target.value;
        setPrice(value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            automobile: auto,
            salesperson: salesperson,
            customer: customer,
            price: price
        }
        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(salesUrl, fetchConfig)
        if (response.ok) {
            const newSaleRecord = await response.json();
            console.log(newSaleRecord);

            setAuto('');
            setSalesperson('');

        }
    }

    return (
    <div className="row">
     <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a New Sale Record</h1>
            <form onSubmit={handleSubmit} id="create-saleRecord-form">
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>

            <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
            </div>

            <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default SaleRecordForm
