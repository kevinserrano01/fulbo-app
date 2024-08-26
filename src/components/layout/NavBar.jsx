import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const anchoImagen = 40;

    // funcion para cerrar sesion
    const handleLogout = () => {
      // Implementar el logout
      window.location.href = '/login';
    };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/soccer.ico" alt="logo Fulbo" width={anchoImagen}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? "text-white" : "",
                    isTransitioning ? "transitioning" : "",
                ].join("")
                }
             >
                Inicio
            </NavLink>
              </li>
              <li className="nav-item">
              <NavLink
                to="/reserva"
                className={({ isActive, isPending, isTransitioning }) =>
                [
                    isPending ? "pending" : "",
                    isActive ? "text-white" : "",
                    isTransitioning ? "transitioning" : "",
                ].join("")
                }
             >
                Reservas
            </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-light" type="button" onClick={handleLogout}>
                Salir
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};