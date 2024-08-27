/* eslint-disable react/prop-types */
export const CardCancha = ({ cancha }) => {
  const anchoCard = {
    width: "auto",
  };
  return (
    <div className="card" style={anchoCard}>
      <img
        src= {cancha.imagen}
        className="card-img-top"
        alt="cancha prueba"
      />
      <div className="card-body">
        <h5 className="card-title"> {cancha.nombre} </h5>
        <p className="card-text"> {cancha.descripcion} </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Ubicacion: {cancha.ubicacion} </li>
        <li className="list-group-item">Tipo: {cancha.tipo} </li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Ver
        </a>
      </div>
    </div>
  );
};
