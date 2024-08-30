import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const NavBar = () => {
    const anchoImagen = 40;
    const { logout } = useAuth("actions");

    // funcion para cerrar sesion
    const handleLogout = () => {
      logout();
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
                <div className="nav-link">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending, isTransitioning }) =>
                    [
                        isPending ? "pending" : "",
                        isActive ? "text-white border-bottom border-white border-3" : "",
                        isTransitioning ? "transitioning" : "",
                    ].join(" ")
                    }
                  >
                      Inicio
                  </NavLink>
              </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/canchas"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                          isPending ? "pending" : "",
                          isActive ? "text-white border-bottom border-white border-3" : "",
                          isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Canchas
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/reservas"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                          isPending ? "pending" : "",
                          isActive ? "text-white border-bottom border-white border-3" : "",
                          isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Mis reservas
                  </NavLink>
                </div>
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