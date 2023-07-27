import React, {useState, useEffect} from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('');
    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        const data = await response.json();
        if (response.ok) {
            setAppointments(data.appointments)
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="my-5 container" id="formDiv">
                <h1 className="text-dark text-center my-3">Service Appointment History</h1>
                <h2 className="text-center my-3">Need to find a vehicle? Just type in the vehicle's VIN number!</h2>
                <i className="bi bi-search"></i>
            <div className="input-group mb-3">
                <input
                    maxLength="17"
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type to search VIN..."
                    aria-label="search"
                >
                </input>
            </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Reason</th>
                            <th>Technician</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments
                        .filter(appointment => appointment.status !== "Pending")
                        .filter(appointment => search === "" || appointment.vin.includes(search))
                        .map(
                                appointment => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.is_vip ? "Yes" : "No" }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ new Date (appointment.date).toLocaleDateString() }</td>
                                    <td>{ new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.status }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    );
}

export default ServiceHistory;
