/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";
import { CgMathPlus } from "react-icons/cg";
import { OpinionesCard } from "./OpinionesCard";
import useFetch from "../hooks/useFetchHook";
import { toast } from "react-toastify";

export const CanchaDetails = () => {
    const navigate = useNavigate();
    const { idCancha } = useParams();
    const { token } = useAuth('state');
    const [opiniones, setOpiniones] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [comentario, setComentario] = useState('');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/canchas/${idCancha}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            const fetchOpiniones = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/opiniones/?soccer_field=${idCancha}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });
                    if (!response.ok) {
                        console.log('Error al obtener los datos de la opinion');
                    }
                    const opinionData = await response.json();
                    setOpiniones(opinionData);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchOpiniones();
        }
    }, [data, token]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleComentarioChange = (e) => setComentario(e.target.value);


    const handleComentar = async () => {
        if (!comentario.trim()) {
            toast.error('No puedes enviar un comentario vacío');
            return;
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/opiniones/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    soccer_field_id: idCancha,
                    description: comentario,
                    stars: 4,
                }),
            });
    
            if (response.ok) {
                toast.success('Comentario agregado correctamente!');
                handleCloseModal();
                // esperar 3 segundos y recargar la página
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error("Error create opinion data:", response.statusText);
                toast.error(errorData[0] || 'Error al agregar comentario :c'); // Mostrar el mensaje de error devuelto por la API
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al agregar comentario');
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleIniciarReserva = () => {
        navigate(`/reservas/addReserva`);
    };


    if (isLoading) {return <div className="container text-center">Cargando...</div>;}
    if (errors) {return <div className="container text-center" >Error: {errors.message}</div>;}
    if (!data) {return <div className="container text-center">Error al cargar los datos de la cancha</div>;}
    if (!opiniones) {return <div className="container text-center">Cargando opiniones...</div>;}

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
            <div className="col-md-2"></div>

            <div className="col-12 col-md-8">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{data.name}</h2>
                        <img src= {data.image} className="card-img-top mb-3" alt="imagen de cancha"/>
                        <p className="card-text"><strong>Ubicación:</strong> {data.address}</p>
                        <p className="card-text"><strong>Descripción:</strong> {data.description}</p>
                        <p className="card-text"><strong>Tipo:</strong></p>
                        <ul className="list-group">
                            <li className="">
                                {data.tags && data.tags.split(",").map((tag, index) => (
                                    <span key={index} className="badge text-bg-dark ms-1">
                                        {tag}
                                    </span>
                                ))}
                            </li>
                        </ul>
                        <p className="card-text mt-3"><strong>Días disponibles:</strong></p>
                        <ul className="list-group">
                            <li className="">
                                {data.days_available && data.days_available.split(",").map((day, index) => (
                                    <span key={index} className="badge text-bg-dark ms-1">
                                        {day}
                                    </span>
                                ))}
                            </li>
                        </ul>
                        <p className="card-text mt-3"><strong>Horarios disponibles:</strong></p>
                        <ul className="list-group">
                            <li className="">
                                {data.hours_available && data.hours_available.split(",").map((hour, index) => (
                                    <span key={index} className="badge text-bg-dark ms-1">
                                        {hour}
                                    </span>
                                ))}
                            </li>
                        </ul>
                        <p className="card-text mt-3"><strong>Propietario:</strong> {data.owner.first_name} {data.owner.last_name}</p>
                        <p className="card-text mt-3"><strong>Precio:</strong> ${data.price}</p>
                        <div className="row">
                            <div className="col-12 col-md-4"></div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-success w-100" type="button" onClick={handleIniciarReserva}>Iniciar reserva</button>
                            </div>
                            <div className="col-12 col-md-4"></div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="col-md-2"></div>

        </div>

        <div className="row mt-5">
            <div className="col-12">
            <p className="card-text"><strong>Opiniones:</strong></p>
              {!opiniones && <p className="text-body-secondary">Cargando opiniones...</p>}
              {opiniones.length === 0 && <p className="text-body-secondary">No hay opiniones</p>}
              {opiniones.map((opinion, index) => (
                <OpinionesCard key={index} opinion={opinion} propietario={opinion.user}/>
              ))}
              <button className="btn btn-dark mb-5" onClick={handleShowModal}>
                <CgMathPlus /> Agregar comentario
              </button>
            </div>
        </div>

        {/* Modal para agregar comentario */}
        {showModal && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-success-subtle">
                            <h5 className="modal-title">Agregar Comentario</h5>
                            {/* <button type="button" className="close" onClick={handleCloseModal} aria-label="Close"> */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <h5>¿Qué opinas de esta cancha?</h5>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Escribe tu comentario aquí..."
                            value={comentario}
                            onChange={handleComentarioChange}
                            required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleComentar}>
                                Comentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>
  )
}
