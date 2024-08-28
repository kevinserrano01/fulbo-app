import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddReserva = () => {
    const navigate = useNavigate();
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [horaSeleccionada, setHoraSeleccionada] = useState('');

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
    const recibirDatosReserva = (e) => {
        e.preventDefault();
        const datosReserva = {
            nombreCancha: e.target.nombreCancha.value,
            ubicacion: e.target.ubicacion.value,
            dia: diaSeleccionado,
            horario: horaSeleccionada
        }
        alert('Cancha reservada con exito');
        console.log(datosReserva);
    }


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form onSubmit={recibirDatosReserva}>
                    <div className="mb-3">
                        <label htmlFor="nombreCancha" className="form-label">Nombre Cancha</label>
                        <input type="text" className="form-control" id="nombreCancha" name="nombreCancha" value="Cancha Los Amigos" disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ubicacion" className="form-label">Ubicacion</label>
                        <input type="text" className="form-control" id="ubicacion" name="ubicacion" value="Av. Belgrano 987, Salta" disabled />
                    </div>
                    <div className="mb-3">
                        <p>Dias disponibles</p>
                        <select className="form-select" aria-label="Default select example" value={diaSeleccionado} onChange={handleCambiarDia}>
                            <option value="" disabled>Selecciona un dia</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Sabado">Sabado</option>
                            <option value="Domingo">Domingo</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <p>Horarios disponibles</p>
                        <select className="form-select" aria-label="Default select example" value={horaSeleccionada} onChange={handleCambiarHora}>
                            <option value="" disabled>Selecciona un horario</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                            <option value="00:00">00:00</option>
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
