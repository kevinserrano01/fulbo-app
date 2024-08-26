
export const Canchas = () => {
    const anchoCard = {
        width: "auto"
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 mb-5 text-center">
                <h2>Canchas en Salta</h2>
            </div>
        </div>
        {/* Comvertir estas cards en un componente */}
        <div className="row">
            <div className="col-12 col-md-4 mb-5">
                <div className="card" style={anchoCard}>
                    <img src="/canchaPrueba.jpg" className="card-img-top" alt="cancha prueba" />
                    <div className="card-body">
                        <h5 className="card-title">Titulo de la cancha</h5>
                        <p className="card-text">Descriccion de la cancha.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Tipo de cancha por ejemplo F5</li>
                        <li className="list-group-item">Dias y Horarios</li>
                        <li className="list-group-item">Precio</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Ver</a>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4 mb-5">
                <div className="card" style={anchoCard}>
                    <img src="/canchaPrueba2.jpg" className="card-img-top" alt="cancha prueba" />
                    <div className="card-body">
                        <h5 className="card-title">San Lorenzo</h5>
                        <p className="card-text">Esta cancha fue habilitada hace mas de 3 años y se llena todos los fines de semana.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Tipo: Futbol 8</li>
                        <li className="list-group-item">Dias: Lunes a Sabados</li>
                        <li className="list-group-item">Horarios: 20:00 a 01:00</li>
                        <li className="list-group-item">Precio: $10.000</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Ver</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
