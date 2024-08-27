/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

export const ReservaCard = ({reserva}) => {
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/reservas/${reserva.id}`)
    }
    
  return (
    <div className="card mb-3">
      <div className="card-header text-bg-success">
        <h3 className="card-subtitle ">Numero de reserva: {reserva.id}</h3>
      </div>
      <div className="card-body">
        <p className="card-text"><strong>Cancha:</strong> {reserva.nombre_cancha}</p>
        <p className="card-text"><strong>Ubicación:</strong> {reserva.ubicacion_cancha}</p>
        <p className="card-text"><strong>Día:</strong> {reserva.dia_reservado}</p>
        <p className="card-text"><strong>Horario:</strong> {reserva.horario_reservado}</p>
        <button className="btn btn-primary fw-bold" onClick={handleDetails}>Ver detalles</button>
      </div>
    </div>
  )
}
