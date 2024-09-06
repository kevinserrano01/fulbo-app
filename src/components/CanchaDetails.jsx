/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";
import { CgMathPlus } from "react-icons/cg";
// import { OpinionesCard } from "./OpinionesCard";
import useFetch from "../hooks/useFetchHook";

export const CanchaDetails = () => {
    const navigate = useNavigate();
    const { idCancha } = useParams();
    const { token } = useAuth('state');
    const [showModal, setShowModal] = useState(false);
    const [comentario, setComentario] = useState('');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/canchas/${idCancha}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleComentarioChange = (e) => setComentario(e.target.value);

    const handleComentar = () => {
        // Aquí puedes agregar la lógica para manejar el comentario
        console.log('Comentario:', comentario);
        handleCloseModal();
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleIniciarReserva = () => {
        navigate(`/reservas/addReserva`);
    };


    if (isLoading) {
        return <div className="container text-center">Cargando...</div>;
    }

    if (errors) {
        return <div className="container text-center" >Error: {errors.message}</div>;
    }

    if (!data) {
        return <div className="container text-center">Error al cargar los datos de la cancha</div>;
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
            <div className="col-md-2"></div>

            <div className="col-12 col-md-8">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{data.nombre}</h2>
                        <img src= {data.imagen} className="card-img-top mb-3" alt="imagen de cancha"/>
                        <p className="card-text"><strong>Ubicación:</strong> {data.direccion}</p>
                        <p className="card-text"><strong>Email:</strong> {data.descripcion}</p>
                        <p className="card-text"><strong>Descripción:</strong> {data.email}</p>
                        <p className="card-text"><strong>Tipo:</strong> {data.tipo}</p>
                        <p className="card-text"><strong>Días disponibles:</strong></p>
                        <ul className="list-group list-group-flush">
                            {/* {data.dias_disponibles.map((dia, index) => (
                                <li key={index} className="list-group-item">{dia}</li>
                            ))} */}
                        </ul>
                        <p className="card-text mt-3"><strong>Horarios disponibles:</strong></p>
                        <ul className="list-group list-group-flush">
                            {/* {data.horarios_disponibles.map((horario, index) => (
                                <li key={index} className="list-group-item">{horario}</li>
                            ))} */}
                        </ul>
                        <p className="card-text"><strong>Propietario:</strong> {data.propietario}</p>
                        <p className="card-text mt-3"><strong>Precio:</strong> ${data.precio}</p>
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
              {/* {data.opiniones.length === 0 && <p className="text-body-secondary">No hay opiniones</p>}
              {data.opiniones.map((opinion, index) => (
                <OpinionesCard key={index} opinion={opinion} />
              ))} */}
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
