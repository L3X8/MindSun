import { userUid, stado
 } from "../../firebase";

import { Lectura } from "../App";
import { Coment, Cpost } from "../App";


function Comentarios () {

    var urlActual = new URL(window.location.href);

// Obtener el valor del parámetro 'v' de la URL
    var id = urlActual.searchParams.get('v');
    return(<>
        <div className="espaciado">
  
  <button  onClick={() => window.location.href = "/"}>
        <img  width={"40px"} src="atras.svg" alt="" />         
      </button>
<img style={{width: "150px" , margin: "5px"}} src="anonimix.png" alt="" />
  </div>
        <Lectura code={id} reccionid={stado ? userUid.likes: []} />
        
       
      </>)

}


export default Comentarios