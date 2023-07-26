import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        const data = await response.json();
        if (response.ok) {
            const finishedAppointments = data.appointments.filter((appointment) => !appointment.finished);
            setAppointments(finishedAppointments);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const deleteAppointment = async (event) => {
        const appointmentUrl = `http://localhost:8080/api/appointment/${event.id}/`
        const fetchConfig = { method: "DELETE"};
        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            fetchAppointments()
        }
    }

    const handleFinished = async (event) => {
        const data = {}
        data["finished"] = true
        const finishedUrl = `http://localhost:8080/api/appointment/${event.id}/`
        const response = await fetch(finishedUrl);
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(finishedUrl, fetchConfig);
        await fetchAppointments();
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="my-5 container" id="formDiv">
            <h1>Service Appointments</h1>
            <h2>
                Your appointment will show up here once you create one!
                <p>
                <Link to="/appointments/new" className="btn createOnList border full-rounded" >Schedule a new appointment</Link>
                </p>
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, id) => {
                    return(
                        <tr key={id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.customer_name }</td>
                            <td>{ new Date (appointment.date).toLocaleDateString() }</td>
                            <td>{ new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.technician.name }</td>
                            <td>
                                <button className="finished__btn" onClick={() => handleFinished(appointment)}>Finished</button>
                                <button className="canceled__btn" onClick={() => deleteAppointment(appointment)}>Cancel</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;
