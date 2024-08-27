import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import data from '../assets/canchas.json'
import { OpinionesCard } from "./OpinionesCard";

export const CanchaDetails = () => {
    const navigate = useNavigate();
    const { idCancha } = useParams();

    const handleBackClick = () => {
        navigate(-1);
    };

    const [cancha] = data.filter((cancha) => cancha.id === parseInt(idCancha));

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4 mb-4">
                <button className="btn btn-light" onClick={handleBackClick}>
                    <SlArrowLeft /> Volver
                </button>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <h2> {cancha.nombre} </h2>
                <p> {cancha.ubicacion} </p>
                <p> {cancha.descripcion} </p>
                <p> {cancha.tipo} </p>
                <p> Dias disponibles: </p>
                <ul>
                    {cancha.dias_disponibles.map((dia, index) => (
                        <li key={index}> {dia} </li>
                    ))}
                </ul>
                <p> Horarios disponibles: </p>
                <ul>
                    {cancha.horarios_disponibles.map((horario, index) => (
                        <li key={index}> {horario} </li>
                    ))}
                </ul>
                <p> Precio: {cancha.precio} </p>
                <p> Opiniones: </p>
                {cancha.opiniones.map((opinion, index) => (
                    <OpinionesCard key={index} opinion={opinion} />
                ))}
            </div>
        </div>
    </div>
  )
}
