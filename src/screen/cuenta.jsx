import { userUid, cerrarSesion } from "../../firebase";
import { Lectura } from "../App";
import { useState, useEffect } from "react";
function Usuario() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (userUid) {
      setUsuario({ ...userUid });
    }
  }, [userUid]);

  if (!usuario) {
    return <h2>Cargando...</h2>;
  }

  const publicaciones = usuario.post || [];
  const likes = usuario.likes || [];

  return (
    <div className="container">

      <div className="perfil">

        <img
          src={usuario.foto || "/anonimo.png"}
          alt="avatar"
          className="avatar"
        />

        <h1>{usuario.username}</h1>

        <p>
          {usuario.verificado
            ? "✔ Usuario verificado"
            : "👤 Usuario anónimo"}
        </p>

      </div>

      <hr />

      <div className="espaciado">
        <h1>ID:</h1>
        <h1>{usuario.uid}</h1>
      </div>

      <div className="espaciado">
        <h1>Universidad:</h1>

        <h1>
          {usuario.universidad == 1
            ? "Autónoma"
            : usuario.universidad == 2
            ? "UTP"
            : "Sin seleccionar"}
        </h1>
      </div>

      <div className="espaciado">
        <h1>Publicaciones:</h1>
        <h1>{publicaciones.length}</h1>
      </div>

      <div className="espaciado">
        <h1>Likes:</h1>
        <h1>{likes.length}</h1>
      </div>

      <button
        className="logout"
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </button>

      <hr />

      <h1>Tus publicaciones</h1>

      {publicaciones.length > 0 ? (
        publicaciones.map((id) => (
          <Lectura
            key={id}
            code={id}
            reccionid={likes}
            layer={2}
          />
        ))
      ) : (
        <p>No tienes publicaciones.</p>
      )}

      <hr />

      <h1>Tus likes</h1>

      {likes.length > 0 ? (
        likes.map((id) => (
          <Lectura
            key={id}
            code={id}
            reccionid={likes}
            layer={2}
          />
        ))
      ) : (
        <p>No has dado ningún like.</p>
      )}

    </div>
  );
}

export default Usuario;