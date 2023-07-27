function ManufacturerList({ manufacturers }) {
    return(
        <>
            <h2 className="mt-4">Manufacturers</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default ManufacturerList
