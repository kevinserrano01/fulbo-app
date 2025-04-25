import "../styles/Home.css"
export const Home = () => {
  return (
      <div className="position-relative">
      <img src="/assets/soccer-game-concept.jpg" className="img-fluid" alt="cancha" />
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
      <h1 className="position-absolute top-0 start-0 m-3 p-display-1 text-light" 
          style={{ zIndex: 1 , fontWeight: 'bold' }}>
        Reserva tu cancha de fútbol de manera fácil y organizada en Salta Capital.
      </h1>
      <button className="position-absolute top-50 start-50 translate-middle btn btn-primary btn-lg btn-success btn-custom" type="button">Empezar</button>
      </div>
          
  )
}
