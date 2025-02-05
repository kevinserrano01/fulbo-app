/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useFetch from "../hooks/useFetchHook";
import { useAuth } from "../contexts/AuthContext";

export const OpinionesCard = ({ opinion, propietario }) => {
  const { token } = useAuth('state');
  const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/users/${propietario}`, {
    method: 'GET',
    headers: {
        'Authorization': `Token ${token}`,
    },
  });

  useEffect(() => {
      doFetch();
  }, []);

  if (isLoading) {
    return <div className="container text-center">Cargando...</div>;
  }

  if (errors) {
      return <div className="container text-center" >Error: {errors.message}</div>;
  }

  if (!data) {
      return <div className="container text-center">Error al cargar los datos del usuario</div>;
  }


  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={data.imagen || 'https://via.placeholder.com/50'}
            alt={data.username}
            className="rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <h5 className="card-title mb-0"> {data.username}</h5>
        </div>
        <p className="card-text">{opinion.descripcion}</p>
        <p className="card-text">
          <small className="text-muted"> {new Date(opinion.fecha_creacion).toLocaleString()}</small>
        </p>
      </div>
    </div>
  )
}
