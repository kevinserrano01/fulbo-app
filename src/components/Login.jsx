/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetchHook";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "http://127.0.0.1:8000/api/token/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        setTriggerFetch(true);
        doFetch(); // fetch
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

    useEffect(() => {
        if (data && !isError && triggerFetch) {
            login(data.access);
        }
    }, [data, isError, triggerFetch]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-12 col-md-4">
        <h2 className="text-center mb-5">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="username" name="username" defaultValue="" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" defaultValue="" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <p >
                Si no tienes cuenta en Fulbo, crea una <span> <a href="/register">aqui</a></span>
              </p>
            </div>
            <div className="mb-3 text-center">
              <div className="control">
                <button type="submit" className="btn btn-primary text-center">Ingresar</button>
                {isLoading && triggerFetch && (
                      <p>Cargando...</p>
                  )}
                {isError && <p>Error al cargar los datos.</p>}
              </div>
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}
