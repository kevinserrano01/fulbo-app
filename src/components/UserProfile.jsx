/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useFetch from '../hooks/useFetchHook';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const UserProfile = () => {
    const { token } = useAuth('state');
    const navigate = useNavigate();
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    const handleEditarPerfil = () => {
        navigate(`/profile/edit`);
    };

    const handleEliminarPerfil = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5CB338',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar cuenta!'
        });

        if (result.isConfirmed) {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                Swal.fire(
                    'Eliminado!',
                    'Tu cuenta ha sido eliminada.',
                    'success'
                );
                navigate(`/login`);
            } else {
                Swal.fire(
                    'Error!',
                    'Algo salió mal.',
                    'error'
                );
            }
        }
    };

    const anchoImagePerfil = {
        width: "auto",
      };

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

  return (
    <div className='container'>
        <div className="row">

            <div className="col-4"></div>

            <div className="col-12 col-md-4">
                <h2 className='text-center mb-4'>Perfil</h2>

                <div className="card" style={anchoImagePerfil}>
                    <img src={data.image} className="card-img-top" alt="foto de perfil" />
                    <div className="card-body">
                        <h5 className='card-title'><strong>{data.first_name} {data.last_name}</strong> </h5>
                        <p className='card-text'><strong>Usuario:</strong> {data.username}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Celular:</strong> {data.telephone}</p>
                        {data.is_owner === true && <p><strong>Rol: </strong>Propietario</p>}
                        {data.is_client === true && <p><strong>Rol: </strong>Cliente</p>}
                        <button className="btn btn-success fw-bold w-100" onClick={handleEditarPerfil}>
                            Editar perfil
                        </button>
                        <button className="btn btn-danger fw-bold w-100 mt-2" onClick={handleEliminarPerfil}>
                            Eliminar cuenta
                        </button>
                    </div>
                </div>                
            </div>

            <div className="col-4"></div>

        </div>
    </div>
  )
}
