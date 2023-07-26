import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CreateCustomerForm';

function App(props) {
  // if(props.sales === undefined) {
  //   return null;
  // }


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="customer">
            <Route path="new" element={<CustomerForm />} />
          </Route>

          <Route path="salesperson">
            <Route path="new" />
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
