import React, { useState } from "react";

function ManufacturerForm({ getManufacturers }) {
    const [name, setName] = useState('');

    const handleNameChange = event => {
        const value = event.target.value;
        setName(value)
    }
}
export default ManufacturerForm
