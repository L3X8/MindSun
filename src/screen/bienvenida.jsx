import { loginGoogle, registro } from "../../firebase";
import { useState } from "react";
function Mensaje() {


  const [loading, setLoading] = useState(false);
  const iniciarGoogle = async () => {
    try {
      setLoading(true);
      await loginGoogle();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const iniciarAnonimo = async () => {
    try {
      setLoading(true);
      // Puedes cambiar "Universidad" por el valor que corresponda
      await registro("Universidad");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">

      <div className="titulo">
       
        <p>Inicia sesión para continuar</p>
      </div>

      <button
        className="google"
        onClick={iniciarGoogle}
      >
        Continuar con Google
      </button>

      <button
        className="anonimo"
        onClick={iniciarAnonimo}
      >
        Entrar como Anónimo
      </button>
       {loading && <div id="loader"></div>}
    </div>
  );
}

export default Mensaje;