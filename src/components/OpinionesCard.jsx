/* eslint-disable react/prop-types */
import { BiSolidUser } from "react-icons/bi";

export const OpinionesCard = ({ opinion }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title"> <BiSolidUser /> {opinion.propietario}</h5>
        <p className="card-text">{opinion.descripcion}</p>
        <p className="card-text">
          <small className="text-muted"> {opinion.fecha_creacion}</small>
        </p>
      </div>
    </div>
  )
}
