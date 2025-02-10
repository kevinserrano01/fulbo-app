/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetchHook";
import { useAuth } from "../contexts/AuthContext";
import Swal from 'sweetalert2'

export const AddReserva = () => {
    const navigate = useNavigate();
    const { idCancha } = useParams();
    const { token } = useAuth('state');
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [horaSeleccionada, setHoraSeleccionada] = useState('');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/canchas/${idCancha}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    const handleCambiarDia = (e) => {
        setDiaSeleccionado(e.target.value);
    };
    
    const handleCambiarHora = (e) => {
        setHoraSeleccionada(e.target.value);
    };


    //funcion para cancelar la reserva y volver una pagina anterior
    const cancelarReserva = () => {
        navigate(-1);
    }

    // recibir los datos del formulario de la reserva y enviarlos a la base de datos
    const recibirDatosReserva = async (e) => {
        e.preventDefault();
        const reserva = {
            "day": diaSeleccionado,
            "hour": horaSeleccionada,
            "field": idCancha,
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/reservas/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(reserva),
            });
            if (response.ok) {
                Swal.fire({
                    title: "Reserva exitosa",
                    icon: "success",
                    draggable: true
                  });
                navigate('/reservas');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error al realizar la reserva",
                  });
            }
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
        }
    }

    if (isLoading) {return <p>Cargando...</p>;}
    if (errors) {return <p>Error al cargar los datos: {errors}</p>;}

    //se extraen los dias y las horas disponibles de sus respectivas cadenas de texto para luego recorrer estos en opciones
    const daysAvailables = data?.days_available ? data.days_available.split(',') : [];
    const hoursAvailables = data?.hours_available ? data.hours_available.split(',') : []; 

    return (
    <div className="container">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form onSubmit={recibirDatosReserva}>
                    <div className="mb-3">
                        <label htmlFor="nombreCancha" className="form-label">Nombre Cancha</label>
                        <input type="text" className="form-control" id="nombreCancha" name="nombreCancha" value={data.name} readOnly/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ubicacion" className="form-label">Ubicacion</label>
                        <input type="text" className="form-control" id="ubicacion" name="ubicacion" value={data.address} readOnly />
                    </div>
                    <div className="mb-3">
                            <p>Días disponibles</p>
                            <select className="form-select" aria-label="Default select example" value={diaSeleccionado} onChange={handleCambiarDia}>
                                <option value="" disabled>Selecciona un día</option>
                                {daysAvailables.map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    <div className="mb-3">
                            <p>Horarios disponibles</p>
                            <select className="form-select" aria-label="Default select example" value={horaSeleccionada} onChange={handleCambiarHora}>
                                <option value="" disabled>Selecciona un horario</option>
                                {hoursAvailables.map((hour, index) => (
                                    <option key={index} value={hour}>{hour}</option>
                                ))}
                            </select>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={cancelarReserva}>Cancelar</button>
                    <button type="submit" className="btn btn-success">Reservar</button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>
  )
}

// preguntar a copilot como hacer para que el boton de reservar me lleve a la pagina de addReserva tomando el id de la cancha seleccionada y mostrar los datos de la cancha para selccionar el dia y horario de la reserva.
