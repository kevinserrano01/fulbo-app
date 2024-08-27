import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import data from '../assets/reservas.json'

export const ReservaDetails = () => {
    const navigate = useNavigate();
    const { idReserva } = useParams();

    const handleBackClick = () => {
        navigate(-1);
    };

    //funcion para cancelar una reserva
    const cancelarReserva = () => {
        //aqui se deberia hacer una peticion a la api para cancelar la reserva
        alert(`Reserva con id ${idReserva} cancelada`)
    }

    const [reserva] = data.filter((reserva) => reserva.id === parseInt(idReserva));

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4 mb-4">
                <button className="btn btn-success fw-bold" onClick={handleBackClick}>
                    <SlArrowLeft /> Volver
                </button>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <div className="card mb-3">
                    <div className="card-header bg-success-subtle">
                        <h3 className="card-subtitle">Numero de reserva: {reserva.id}</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Autor:</strong> {reserva.autor}</p>
                        <p className="card-text"><strong>Cancha:</strong> {reserva.nombre_cancha}</p>
                        <p className="card-text"><strong>Ubicación:</strong> {reserva.ubicacion_cancha}</p>
                        <p className="card-text"><strong>Tipo:</strong> {reserva.tipo_cancha}</p>
                        <p className="card-text"><strong>Día:</strong> {reserva.dia_reservado}</p>
                        <p className="card-text"><strong>Horario:</strong> {reserva.horario_reservado}</p>
                        <p className="card-text"><strong>Total a pagar:</strong> {reserva.precio}</p>
                        <button className="btn btn-danger" onClick={cancelarReserva}>Cancelar reserva</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

