import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function AppointmentList() {
    const [appointments, setAppointments,] = useState([]);
    const [filterArray, setFilterArray] = useState([]);
    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            // const finishedAppointments = data.appointments.filter((appointment) => !appointment.finished);;
            console.log(data)
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const deleteAppointment = async (id) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchConfig = { method: "PUT" };
        const response = await fetch(cancelUrl, fetchConfig);
        if (response.ok) {
            fetchAppointments();
        }
    }

    const handleFinished = async (id) => {
        const finishedUrl = `http://localhost:8080/api/appointments/${id}/finish/`
        const fetchConfig = { method: "PUT" };
        const response = await fetch(finishedUrl, fetchConfig);
        if (response.ok) {
            fetchAppointments();
        }
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
                        <th>Is VIP?</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter(appointment => appointment.status == "Pending").map((appointment, id) => {
                    return(
                        <tr key={id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.customer_name }</td>
                            <td>{ new Date (appointment.date).toLocaleDateString() }</td>
                            <td>{ new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.technician.name }</td>
                            <td>{appointment.is_vip ? "Yes" : "No"}</td>
                            <td>
                                <button className="finished__btn" onClick={() => handleFinished(appointment.id)}>Finished</button>
                                <button className="canceled__btn" onClick={() => deleteAppointment(appointment.id)}>Cancel</button>
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
