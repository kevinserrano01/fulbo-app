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
      {cancha.image ? 
        <img src= {cancha.image} className="card-img-top" alt="imagen de cancha"/>
        : 
        <img src="./canchaPrueba2.jpg" className="card-img-top" alt="cancha prueba"/>
      }
      <div className="card-body">
        <h5 className="card-title"> {cancha.name} </h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Ubicacion: {cancha.address} </li>
        <li className="list-group-item">{cancha.tags} </li>
      </ul>
      <div className="card-body">
        <button className="btn btn-success fw-bold w-100" onClick={handleDetails}>
          Ver
        </button>
      </div>
    </div>
  );
};
