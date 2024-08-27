/* eslint-disable react/prop-types */
import { BiSolidUser } from "react-icons/bi";

export const OpinionesCard = ({ opinion }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title"> <BiSolidUser /> {opinion.usuario}</h5>
        <p className="card-text">{opinion.comentario}</p>
        <p className="card-text">
          <small className="text-muted">Puntuación {opinion.puntuacion}</small>
        </p>
      </div>
    </div>
  )
}
