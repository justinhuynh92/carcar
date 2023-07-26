function CustomerList({ customers }) {
    return(
        <>
            <h2 className="mt-4">Customers</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.phone_number}</td>
                                <td>{customer.address}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default CustomerList
