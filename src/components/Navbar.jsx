import { Link, Outlet } from "react-router-dom";
import  "../style/Navbar.css";
const Navbar = () => {
  return (
    <div>
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/inicio" className="navbar-link">Inicio</Link>
        <Link to="/inicio/tienda" className="navbar-link">Tienda</Link>
        {/* <Link to="/inicio/coleccion" className="navbar-link">Colección</Link> */}
      </div>
    </nav>
    <div className="navbar-spacer"></div>
    <Outlet />
  </div>
  );
};

export default Navbar;
