import data from '../assets/reservas.json'
import { ReservaCard } from './ReservaCard'

export const Reserva = () => {

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
