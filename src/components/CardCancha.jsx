/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export const CardCancha = ({ cancha }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/canchas/${cancha.id}`);
  };

  const anchoCard = {
    width: "auto",
  };


  return (
    <div className="card" style={anchoCard}>
      {cancha.imagen ? 
        <img src= {cancha.imagen} className="card-img-top" alt="imagen de cancha"/>
        : 
        <img src="./canchaPrueba2.jpg" className="card-img-top" alt="cancha prueba"/>
      }
      <div className="card-body">
        <h5 className="card-title"> {cancha.nombre} </h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Ubicacion: {cancha.direccion} </li>
        <li className="list-group-item">Tipo: {cancha.tipo} </li>
      </ul>
      <div className="card-body">
        <button className="btn btn-success fw-bold w-100" onClick={handleDetails}>
          Ver
        </button>
      </div>
    </div>
  );
};
