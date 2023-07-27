import React, { useState } from 'react';
import SalesList from './SalesList';

function SalespersonHistory({ sales }) {
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  // Function to handle dropdown change event
  const handleSalespersonChange = (event) => {
    setSelectedSalesperson(event.target.value);
  };

  const filteredSales = sales.filter(
    (sale) => sale.salesperson.employee_id === selectedSalesperson
  );

  return (
    <div className="container">
      <h1>Salesperson History</h1>
      <label htmlFor="salesperson-select">Select Salesperson:</label>
      <select id="salesperson-select" onChange={handleSalespersonChange} value={selectedSalesperson}>
        <option value="">Select a Salesperson</option>
        {/* Assuming salespersons have unique employee IDs */}
        {sales.map((sale, idx) => (
          <option key={idx} value={sale.salesperson.employee_id}>
            {sale.salesperson.first_name} {sale.salesperson.last_name}
          </option>
        ))}
      </select>

      <div id="sales-history">
        {selectedSalesperson && filteredSales.length > 0 ? (
          <SalesList sales={filteredSales} />
        ) : (
          <p>No sales history available for the selected salesperson.</p>
        )}
      </div>
    </div>
  );
}

export default SalespersonHistory;
