import React, { useState, useEffect } from "react";

function SaleRecordForm({ getSalespersons, getAutos, getCustomers, autos, salespersons, customers }) {
    //add more stuff...customers, salespersons & auto vin state arrays to add to form for dropdowns
    //then invoke SaleRecordForm in router and pass it the getSales prop
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
        const parsedPrice = parseInt(price);
        if(Number.isNaN(parsedPrice)) {
            console.log("Please enter a valid number");
            return;
        }
        const data = {
            automobile: auto,
            salesperson: salesperson,
            customer: customer,
            price: parseInt(price)
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

            //changes sold status to true in the front-end
            const statusChange = autos.map(autoItem =>
                autoItem.vin === newSaleRecord.automobile.vin ? {...autoItem, sold: true} : autoItem
                );

            setAuto('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
            getAutos();
            getSalespersons();
            getCustomers();
            //update frontend state
            setAuto(statusChange);


            const updateBackend = `http://localhost:8100/api/automobiles/${newSaleRecord.automobile.vin}/`
            const backendConfig = {
                method: "PUT",
                body: JSON.stringify({sold: true}),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            await fetch(updateBackend, backendConfig);
        }
    }

    return (
    <div className="row">
     <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Record a new sale record</h1>
            <form onSubmit={handleSubmit} id="create-saleRecord-form">
            <div className="mb-3">
                <select value={auto} onChange={handleAutoChange} required name="vin" id="vin" className="form-select">
                    <option value="">Choose an automobile VIN</option>
                        {autos.filter(auto => auto.sold === false).map((automobile, index) => {
                            return (
                                <option key={index} value={automobile.vin}>
                                    {automobile.vin}
                                </option>
                            )})}
                </select>
            </div>
            <div className="mb-3">
                <select value={salesperson} onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose a salesperson</option>
                        {salespersons.map((salesperson, index) => {
                            return (
                                <option key={index} value={salesperson.employee_id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>
            <div className="mb-3">
                <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a customer</option>
                        {customers.map((customer, index) => {
                            return (
                                <option key={index} value={customer.id}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>

            <div className="form-floating mb-3">
                <input onChange={handlePriceChange} value={price} placeholder="Price" required type="text" name="price" id="price" className="form-control"/>
                <label htmlFor="price">Price</label>
            </div>

            <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default SaleRecordForm
