
export const Register = () => {

    // funcion para registart usuario y redirigir a la pagina de login
    const handleSubmit = (event) => {
        // Implementar el registro
        event.preventDefault();
        //recibir los datos y mostrarlos en consola
        console.log(event.target.fullname.value);
        console.log(event.target.email.value);
        console.log(event.target.celular.value);
        console.log(event.target.password.value);
        
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-4"></div>

            <div className="col-4">
                <h2 className="text-center mb-5">Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" id="fullname" name="fullname" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electronico</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="celular" className="form-label">Celular</label>
                        <input type="number" className="form-control" id="celular" name="celular" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" name="password" required/>
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            <button type="submit" className="btn btn-primary text-center">Registrarme</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="col-4"></div>
        </div>
    </div>
  )
}
