import React, { useEffect, useState } from "react";

function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFirstNameChange = event => {
        const value = event.target.value;
        setFirstName(value)
    }
    const handleLastNameChange = event => {
        const value = event.target.value;
        setLastName(value)
    }
    const handleAddressChange = event => {
        const value = event.target.value
        setAddress(value)
    }
    const handlePhoneNumberChange = event => {
        const value = event.target.value
        setPhoneNumber(value)
    }
    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_number: phoneNumber
        }
        console.log(data)

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

    return(
<div className="=row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit} id="create-customer-form">
                <h1>Add a Customer</h1>
                <div className="form-floating mb-3">
                    <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="firstName" name="firstName" className="form-control"/>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="lastName" name="lastName" className="form-control"/>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" id="address" name="address" className="form-control"/>
                    <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" type="text" required id="phoneNumber" name="phoneNumber" className="form-control"/>
                    <label htmlFor="phoneNumber">Phone Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</div>

    )
 }

export default CustomerForm
