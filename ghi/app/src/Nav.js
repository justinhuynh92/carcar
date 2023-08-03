import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson/new">Add a Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson">Salespeople List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/new">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturer/new">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/model/new">Add a Vehicle Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturer">Manufacturer List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer">Customer List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salerecord/new">Add a Sale Record</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salerecord">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/saleshistory">Salesperson History</NavLink>
            </li> */}
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Inventory
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/automobiles">Automobiles List</Link></li>
                    <li><Link className="dropdown-item" to="/automobiles/new">New Automobile</Link></li>
                    <li><Link className="dropdown-item" to="/manufacturer/new">Add a Manufacturer</Link></li>
                    <li><Link className="dropdown-item" to="/manufacturer">Manufacturer List</Link></li>
                    <li><Link className="dropdown-item" to="/model/new">Add a Vehicle Model</Link></li>
                  </ul>
                </li>
              </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav" style={{ color: "black" }}>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/salesperson/new">Add a Salesperson</Link></li>
                    <li><Link className="dropdown-item" to="/salesperson">Salespeople List</Link></li>
                    <li><Link className="dropdown-item" to="/salerecord/new">Add a Sale Record</Link></li>
                    <li><Link className="dropdown-item" to="/saleshistory">Salesperson History</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav" style={{ color: "black" }}>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Customer</a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/customer/new">Add a Customer</Link></li>
                    <li><Link className="dropdown-item" to="/customer">Customer List</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav" style={{ color: "black" }}>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/appointments/new">New Appointment</Link></li>
                    <li><Link className="dropdown-item" to="/appointments">Appointments List</Link></li>
                    <li><Link className="dropdown-item" to="/appointments/history">Service Appointment History</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Employees</a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/technicians">Technicians</Link></li>
                    <li><Link className="dropdown-item" to="/technicians/new">New Technician</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
