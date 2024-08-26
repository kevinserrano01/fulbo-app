
export const Login = () => {
  const handleSubmit = (event) => {
    // Implementar el registro
    event.preventDefault();
    //recibir los datos y mostrarlos en consola
    console.log(event.target.email.value);
    console.log(event.target.password.value);
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-12 col-md-4">
        <h2 className="text-center mb-5">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electronico</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" required/>
            </div>
            <div className="mb-3">
              <p >
                Si no tienes cuenta en Fulbo, crea una <span> <a href="/register">aqui</a></span>
              </p>
            </div>
            <div className="mb-3 text-center">
              <div className="control">
                <button type="submit" className="btn btn-primary text-center">Ingresar</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}
