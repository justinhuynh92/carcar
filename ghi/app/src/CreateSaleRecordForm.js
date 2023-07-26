import React, { useState, useEffect } from "react";

function SaleRecordForm({ getSales }) {


    return (
    <div className="row">
     <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a New Sale Record</h1>
            <form onSubmit={handleSubmit} id="create-saleRecord-form">
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>
            <div className="mb-3">
                <select value={states} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                                <option key={state.abbreivation} value={state.abbreviation}>
                                    {state.state_name}
                                </option>
                            )
                        }

                        )}
                </select>
            </div>

            <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
            </div>

            <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default SaleRecordForm
