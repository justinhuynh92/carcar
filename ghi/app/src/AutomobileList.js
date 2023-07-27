import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AutoList() {
    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const Url = `http://localhost:8100/api/automobiles/`;
        const response = await fetch(Url);

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container" id="formDiv">
            <h1>Automobiles</h1>
            <h2>All of our in stock vehicles are here!</h2>
        <p>
            <Link to="/automobiles/new" className="btn createOnList border full-rounded">Add A New Automobile</Link>
        </p>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {autos.map((auto, id) => {
                    return (
                        <tr key={id}>
                            <td>{auto.vin}</td>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.model.manufacturer.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    )
}

export default AutoList;
