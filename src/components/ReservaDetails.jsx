/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import useFetch from "../hooks/useFetchHook";
import Swal from 'sweetalert2'

export const ReservaDetails = () => {
    const navigate = useNavigate();
    const { idReserva } = useParams();
    const { token } = useAuth('state');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/reservas/${idReserva}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    //funcion para cancelar una reserva
    const cancelarReserva = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/reservas/${idReserva}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });

                if (response.ok) {
                    Swal.fire('Reserva cancelada', '', 'success');
                    navigate('/reservas');
                } else {
                    Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
            }
        }
    }

    if (isLoading) {return <div className="container text-center">Cargando...</div>;}
    if (errors) {return <div className="container text-center" >Error: {errors.message}</div>;}
    if (!data) {return <div className="container text-center">Error al cargar los datos de la reserva</div>;}

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
                        <p className="card-text"><strong>Día:</strong> {data.day}</p>
                        <p className="card-text"><strong>Horario:</strong> {data.hour}</p>
                        <p className="card-text"><strong>Total a pagar:</strong> $ {data.soccer_field.price}</p>
                        <button className="btn btn-danger" onClick={cancelarReserva}>Cancelar reserva</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-12">
                <div className="card mb-5">
                    <div className="card-header bg-info-subtle">
                        <h3 className="card-subtitle">Cancha Reservada</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Nombre:</strong> {data.soccer_field.name}</p>
                        <p className="card-text"><strong>Ubicación:</strong> {data.soccer_field.address}</p>
                        <p className="card-text"><strong>Tipo:</strong> {data.soccer_field.tags}</p>
                        <p className="card-text"><strong>Precio por hora:</strong> {data.soccer_field.price}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

