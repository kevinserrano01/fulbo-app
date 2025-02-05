/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from 'sweetalert2'

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}login/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
              throw new Error('Error al iniciar sesión');
          }

          const data = await response.json();
          login(data.access);
          Swal.fire({
            title: "Bienvenido!",
            icon: "success",
            draggable: true
          });
      } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.message,
            text: "Usuario o contraseña incorrectos",
          });
      } finally {
          setIsLoading(false);
      }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-12 col-md-4">
        <h2 className="text-center mb-5">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="username" name="username" defaultValue="" onChange={handleChange} required autoComplete="username"/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" defaultValue="" onChange={handleChange} required autoComplete="current-password"/>
            </div>
            <div className="mb-3">
              <p >
                Si no tienes cuenta, crea una <span> <a href="/register">aqui</a></span>
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
