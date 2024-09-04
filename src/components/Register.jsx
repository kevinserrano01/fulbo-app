/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetchHook";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    celular: "",
    password: "",
    imagen: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0], // Solo se permite seleccionar un archivo
    });
  };

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "http://127.0.0.1:8000/api/register/",
    {
      method: "POST",
    }
  );

  // funcion para registart usuario y redirigir a la pagina de login
  const handleSubmit = (event) => {
    event.preventDefault();
    // Crea un objeto FormData para enviar datos al backend
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("celular", formData.celular);
    form.append("password", formData.password);
    form.append("imagen", formData.imagen); // Incluye la imagen en el form

    doFetch({ body: form });
    alert("Usuario registrado con exito");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>

        <div className="col-12 col-md-6">
          <h2 className="text-center mb-5">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electronico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="celular" className="form-label">
                Celular
              </label>
              <input
                type="number"
                className="form-control"
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Foto de perfil
              </label>
              <div className="control has-icons-left">
                <input
                  className="form-control"
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 text-center">
              <div className="control">
                <button type="submit" className="btn btn-primary text-center">
                  Registrarme
                </button>
              </div>
            </div>
            <div className="mb-3 text-center">
              <div className="control">
                {isError && <p>Error al cargar los datos.</p>}
                {data && <p>Usuario registrado con exito</p>}
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-3"></div>
      </div>
    </div>
  );
};
