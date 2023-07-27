import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import { useState, useEffect } from 'react';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ServiceHistory from './ServiceHistory';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const statusType = {
    Pending: "Pending",
    Success: "Success",
    Failed: "Failed",
  };

  const getAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json()
      const appointments = data.appointments
      setAppointments(appointments)
    }
  };
  const getTechnicians = async () => {
    const url = 'http://localhost:8080/api/technicians'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json()
      const technicians = data.technicians
      setTechnicians(technicians)
    }
  };
  const getAutomobiles = async () => {
    const url = 'http://localhost:8100/api/automobiles'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json()
      const automobiles = data.automobiles
      setAutomobiles(automobiles)
    }
  };

  useEffect(() => {
    getAppointments();
    getTechnicians();
    getAutomobiles();
  }, [
    setAppointments,
    setTechnicians,
    setAutomobiles,
  ]);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="appointments">
            <Route path="" element={<AppointmentList appointments={appointments} getAppointments={getAppointments} />} />
            <Route path="history" element={<ServiceHistory />} />
            <Route path="new" element={<AppointmentForm getAppointments={getAppointments} />} />
          </Route>
          <Route path="technicians">
            <Route path="" element={<TechnicianList technicians={technicians} getTechnicians={getTechnicians} />} />
            <Route path="new" element={<TechnicianForm getTechnicians={getTechnicians} />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList automobiles={automobiles} getAutomobiles={getAutomobiles} />} />
            <Route path="new" element={<AutomobileForm getAutomobiles={getAutomobiles} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
