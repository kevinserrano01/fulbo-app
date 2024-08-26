import { CardCancha } from "./CardCancha"
import data from '../assets/canchas.json'

export const Canchas = () => {
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
