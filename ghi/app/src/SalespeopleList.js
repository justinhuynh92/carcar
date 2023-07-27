function SalespeopleList({ salespersons }) {
    return(
        <>
            <h2 className="mt-4">Salespeople</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons.map((salesperson, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default SalespeopleList
