import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CreateCustomerForm';
import SalespersonForm from './CreateSalespersonForm';
import CustomerList from './CustomersList';
import SalespeopleList from './SalespeopleList';
import ManufacturerForm from './CreateManufacturerForm';

function App() {

  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);

  async function getManufacturers() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
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
      setSalespersons(data.salespersons)
    } else {
      console.error('Could not fetch data')
    }
  }


  useEffect(() => {
    getManufacturers();
    getModels();
    getSales();
    getCustomers();
    getSalespersons();
  }, [])



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
          </Route>

          <Route path="salerecord">
            {/* add element = component name and any props */}
            <Route path="new" />
            {/* add the component that lists all sales and any props */}
            <Route index  />
          </Route>

          {/* add element component and any props */}
          <Route path="saleshistory" />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
