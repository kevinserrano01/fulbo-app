/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetchHook";
import { useState } from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    telephone: "",
    password: "",
    image: null,
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
      image: e.target.files[0], // Solo se permite seleccionar un archivo
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("telephone", formData.telephone);
    form.append("password", formData.password);
    if (formData.image instanceof File) {
        form.append("image", formData.image); // Incluye la imagen solo si es un archivo
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}register/`, {
            method: 'POST',
            body: form,
        });

        if (response.ok) {
            const updatedData = await response.json();
            setFormData({
                username: updatedData.username || "",
                email: updatedData.email || "",
                first_name: updatedData.first_name || "",
                last_name: updatedData.last_name || "",
                telephone: updatedData.telephone || "",
                password: updatedData.password || "",
                image: updatedData.image || null,
            });
            toast.success("Cuenta creada con éxito!");
            navigate("/login");
        } else {
            toast.error("Error al crear cuenta :(.");
            console.error("Error create user data:", response.statusText);
        }
    } catch (error) {
        console.error("Error al crear cuenta:", error);
    }
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
                autoComplete="username"
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
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">
                Celular
              </label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                autoComplete="telephone"
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
                autoComplete="current-password"
              />
            </div>
            <div className="mb-3 text-center">
              <div className="control">
                <button type="submit" className="btn btn-primary text-center">
                  Registrarme
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-3"></div>
      </div>
    </div>
  );
};
