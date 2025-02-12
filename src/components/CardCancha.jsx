import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import useFetch from "../hooks/useFetchHook";

export const CardCancha = ({ cancha }) => {
  const { token } = useAuth('state');
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]); //estado para almacenar la lista de favoritos
  const [isFavorite, setIsFavorite] = useState(false); //estado para saber si la cancha es favorita

  const handleDetails = () => {
    navigate(`/canchas/${cancha.id}`);
  };

  const [{ dataProfile, isLoadingProfile, errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  const [{ data , isLoading, errors }, doFetchFavorites] = useFetch(`${import.meta.env.VITE_BASE_URL}api/favoritos/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  useEffect(() => {
    doFetchFavorites();
    doFetchProfile();
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFavorites(data);
      setIsFavorite(data.some(fav => fav.soccer_field === cancha.id));
    }
  }, [data]);
  

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeFavorite(cancha.id);
    } else {
      await addFavorite(cancha.id);
    }
    doFetchFavorites(); //  Vuelve a cargar la lista de favoritos desde la API
  };
  
  

  const addFavorite = async (canchaId) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/favoritos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ soccer_field: canchaId }),
    });
  
    if (response.ok) {
      doFetchFavorites(); // Recargar la lista de favoritos
    } else {
      console.error("Error al agregar a favoritos", await response.json());
    }
  };
  

  const removeFavorite = async (canchaId) => {
    // Buscar el ID del favorito que tiene la cancha
    const favoriteToRemove = favorites.find(fav => fav.soccer_field === canchaId);
  
    if (!favoriteToRemove) {
      console.error("No se encontró el favorito a eliminar.");
      return;
    }
  
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/favoritos/${favoriteToRemove.id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
  
    if (response.ok) {
      doFetchFavorites(); // Recargar la lista de favoritos después de eliminar
    } else {
      console.error("Error al eliminar de favoritos", await response.json());
    }
  };

  const anchoCard = {
    width: "auto",
  };
  return (
    <div className="card" style={anchoCard}>
      <div className="fav-container" style={{ position: "absolute", top: "5px", right: "5px" }} onClick={handleFavoriteClick}>
        <img 
          src={isFavorite ? "/assets/iconoFav.png" : "/assets/iconoNoFav.png"} 
          alt={isFavorite ? "icono-favorito" : "icono-no-favorito"} 
          className={isFavorite ? "icono-fav" : "icono-no-fav"} 
          style={{ width: "30px" }} 
        />
      </div>
      {cancha.image ? (
        <img src={cancha.image} className="card-img-top" alt="imagen de cancha" />
      ) : (
        <img src="/assets/canchaPrueba2.jpg" className="card-img-top" alt="cancha prueba" />
      )}
      <div className="card-body">
        <h5 className="card-title"> {cancha.name} </h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Ubicacion: {cancha.address} </li>
        <li className="list-group-item">{cancha.tags} </li>
      </ul>
      <div className="card-body">
        <button className="btn btn-success fw-bold w-100" onClick={handleDetails}>
          Ver
        </button>
      </div>
    </div>
  );
};
