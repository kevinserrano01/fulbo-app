/* eslint-disable react-hooks/exhaustive-deps */
import { CardCancha } from "./CardCancha"
import useFetch from "../hooks/useFetchHook"
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
// import data from '../assets/canchas.json'

export const Canchas = () => {
    const { token } = useAuth('state');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/canchas`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar canchas.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

  return (
    <div className="container">
        <div className="row">
            <div className="col-12 mb-5 text-center">
                <h2>Canchas en Salta</h2>
            </div>
        </div>
        <div className="row">
                {!data ? 
                    <p>No hay canchas disponibles</p> 
                :
                    data.map((cancha) => {
                        return (
                            <div key={cancha.id} className="col-12 col-md-4 mb-4">
                                <CardCancha cancha={cancha} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}
