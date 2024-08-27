
export const AddReserva = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form>
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
                        <select className="form-select" aria-label="Default select example" defaultValue="">
                            <option value="" disabled>Selecciona un dia</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <p>Horarios disponibles</p>
                        <select className="form-select" aria-label="Default select example" defaultValue="">
                            <option value="" disabled>Selecciona un horario</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Reservar</button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>
  )
}
