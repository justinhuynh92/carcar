import React, { useEffect, useState } from 'react';

function AppointmentForm() {
    const [vin, setVin] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const fetchData = async () => {
        const Url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(Url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerNameChange = (event) => {
        const value = event.target.value;
        setCustomerName(value);
    }
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.customer_name = customerName;
        data.reason = reason;
        data.technician = technician;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setVin('');
            setCustomerName('');
            setDate('');
            setReason('');
            setTechnician('');
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a New Appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input
                        value={vin}
                        onChange={handleVinChange}
                        placeholder="Vin"
                        required type="text"
                        name="vin"
                        id="vin"
                        className="form-control"
                        />
                        <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        value={customerName}
                        onChange={handleCustomerNameChange}
                        placeholder="Customer Name"
                        required type="text"
                        name="customer_name"
                        id="customer_name"
                        className="form-control"
                        />
                        <label htmlFor="customer_name">Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        value={date}
                        onChange={handleDateChange}
                        placeholder="Date/Time"
                        required type="datetime-local"
                        name="date"
                        id="date"
                        className="form-control"
                        />
                        <label htmlFor="date">Date and Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        value={reason}
                        onChange={handleReasonChange}
                        placeholder="Short Reason"
                        required type="text"
                        name="reason"
                        id="reason"
                        className="form-control"
                        />
                        <label htmlFor="reason">Short Reason</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                        value={technician}
                        onChange={handleTechnicianChange}
                        name="technician"
                        id="technician"
                        className="form-select">
                            <option value="">Choose a Technician</option>
                            {technicians.map(technician => {
                                return (
                                <option key={technician.id} value={technician.id}>
                                {technician.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="text-center">
                    <button className="cta">
                        <span>Schedule</span>
                        <svg viewBox="0 0 13 10" height="10px" width="15px">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default AppointmentForm;
