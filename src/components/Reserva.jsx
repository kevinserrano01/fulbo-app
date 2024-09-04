/* eslint-disable react-hooks/exhaustive-deps */
import { ReservaCard } from './ReservaCard'
import useFetch from '../hooks/useFetchHook';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export const Reserva = () => {
  const { token } = useAuth('state');
  const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/reservas`, {
      method: 'GET',
      headers: {
          'Authorization': `Token ${token}`,
      },
  });

  useEffect(() => {
      doFetch();
  }, []);

  if (isLoading) return <div className='container text-center'>Cargando...</div>;
  if (errors) return <div className='container text-center'>Error al cargar las reservas.</div>;
  if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

  return (
    <div className="container">
      <div className="row mb-4">
        <h2 className="text-center">Mis reservas</h2>
      </div>

    <div className="row">
      <div className="col-12">
        {data.length === 0 ? (
          <div className='alert alert-warning text-center' role="alert">No hay reservas</div>
        ) : (
          data.map((reserva, index) => (
            <ReservaCard key={index} reserva={reserva} />
          ))
        )}
      </div>
    </div>

    </div>
  )
}
