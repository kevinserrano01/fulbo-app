/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const OpinionesCard = ({ opinion }) => {
    // Función para formatear la fecha y hora
    const timeAgo = formatDistanceToNow(new Date(opinion.created_at), { addSuffix: true, locale: es });


  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={opinion.user.image || 'https://via.placeholder.com/50'}
            alt="foto de perfil"
            className="rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <h5 className="card-title mb-0"> {opinion.user.username}</h5>
        </div>
        <p className="card-text">{opinion.description}</p>
        <p className="card-text">
          <small className="text-muted">Publicado {timeAgo}</small>
        </p>
      </div>
    </div>
  )
}
