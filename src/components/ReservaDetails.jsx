/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetchHook";

export const ReservaDetails = () => {
    const navigate = useNavigate();
    const { idReserva } = useParams();
    const { token } = useAuth('state');
    const [cancha, setCancha] = useState(null);
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/reservas/${idReserva}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data && data.cancha) {
            const fetchCancha = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/canchas/${data.cancha}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });
                    if (!response.ok) {
                        console.log('Error al obtener los datos de la cancha');
                    }
                    const canchaData = await response.json();
                    setCancha(canchaData);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchCancha();
        }
    }, [data, token]);

    const handleBackClick = () => {
        navigate(-1);
    };

    //funcion para cancelar una reserva
    const cancelarReserva = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/reservas/${idReserva}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
        });

        if (!response.ok) {
            alert('Error al cancelar la reserva');
            return;
        }

        alert(`Reserva con id ${idReserva} cancelada`)
        navigate('/reservas');
    }

    if (isLoading) {
        return <div className="container text-center">Cargando...</div>;
    }

    if (errors) {
        return <div className="container text-center" >Error: {errors.message}</div>;
    }

    if (!data) {
        return <div className="container text-center">Error al cargar los datos de la reserva</div>;
    }

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
                        <h3 className="card-subtitle">Numero de reserva: {data.id}</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Día:</strong> {data.fecha}</p>
                        <p className="card-text"><strong>Horario:</strong> {data.hora}</p>
                        <p className="card-text"><strong>Total a pagar:</strong> {data.precio}</p>
                        <button className="btn btn-danger" onClick={cancelarReserva}>Cancelar reserva</button>
                    </div>
                </div>
            </div>
        </div>

        {cancha && (
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card mb-5">
                        <div className="card-header bg-info-subtle">
                            <h3 className="card-subtitle">Cancha Reservada</h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text"><strong>Nombre:</strong> {cancha.nombre}</p>
                            <p className="card-text"><strong>Ubicación:</strong> {cancha.direccion}</p>
                            <p className="card-text"><strong>Tipo:</strong> {cancha.tipo}</p>
                            <p className="card-text"><strong>Precio por hora:</strong> {cancha.precio}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
    </div>
  )
}

