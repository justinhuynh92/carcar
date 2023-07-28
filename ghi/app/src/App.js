import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CreateCustomerForm';
import SalespersonForm from './CreateSalespersonForm';
import CustomerList from './CustomersList';
import SalespeopleList from './SalespeopleList';
import ManufacturerForm from './CreateManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleModelForm from './CreateModelForm';
import SaleRecordForm from './CreateSaleRecordForm';
import SalesList from './SalesList';
import SalespersonHistory from './SalespersonHistory';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ServiceHistory from './ServiceHistory';

function App() {

  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [autos, setAutos] = useState([]);

  async function getManufacturers() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setManufacturers(data.manufacturers);
    } else {
      console.error('Could not fetch the data')
    }
  }

  async function getModels() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    } else {
      console.error('Could not fetch the data');
    }
  }

  async function getSales() {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    } else {
      console.error('Could not fetch the data');
    }
  }
  async function getCustomers() {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setCustomers(data.customers)
    } else {
      console.error('Could not fetch data')
    }
  }
  async function getSalespersons() {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setSalespersons(data.salespersons)
    } else {
      console.error('Could not fetch data')
    }
  }
  async function getAutos() {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setAutos(data.autos)
    }
  }


  useEffect(() => {
    getManufacturers();
    getModels();
    getSales();
    getCustomers();
    getSalespersons();
    getAutos();
  }, [])



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

          <Route path="customer">
            <Route path="new" element={<CustomerForm getCustomers={getCustomers} />} />
            <Route index element={<CustomerList customers={customers}/>} />
          </Route>

          <Route path="salesperson">
            <Route path="new" element={<SalespersonForm getSalespersons={getSalespersons} />} />
            <Route index element={<SalespeopleList salespersons={salespersons}/>}/>
          </Route>

          <Route path="manufacturer">
            <Route path="new" element={<ManufacturerForm getManufacturers={getManufacturers}/>} />
            <Route index element={<ManufacturerList manufacturers={manufacturers}/>} />
          </Route>

          <Route path="model">
            <Route path="new" element={<VehicleModelForm getManufacturers={getManufacturers} manufacturers={manufacturers} getModels={getModels} />} />
          </Route>

          <Route path="salerecord">
            {/* add element = component name and any props */}
            <Route path="new" element={<SaleRecordForm getAutos={getAutos} getSalespersons={getSalespersons} getCustomers={getCustomers} autos={autos} customers={customers} salespersons={salespersons} />} />
            {/* add the component that lists all sales and any props */}
            <Route index element={<SalesList sales={sales}/>} />
          </Route>



          {/* add element component and any props */}
          <Route path="saleshistory" element={<SalespersonHistory sales={sales} />} />

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
