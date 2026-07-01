import { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import {Toaster,toast} from "sonner"
import {
    agregar,
    getFirstPagePosts,
    confeti,
    setlikes,
    state,
    userUid,
    userupdate,
   userupdatepost,
   stado,
   db


} from "/firebase.js";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Share from "./sharing";
import {DinamicBox , LogOut} from "../componentes/boxdinamic";


console.log(stado)


function capturarYCompartir(identifica, quees) {
  toast("compartiendo")
  const contenedor = document.getElementById('comparto');

  // Captura con html2canvas
  html2canvas(contenedor, {backgroundColor: "rgba(0,0,0,0)"}).then(function(canvas) {
    // Guarda la captura como blob
    canvas.toBlob(function(blob) {
      const file = new File([blob], 'confesion.png', { type: 'image/png' });
      
      // Guarda el blob en una variable global para ser utilizado por las funciones específicas
      window.sharedFile = file;

      // Muestra la barra de compartir si está disponible en el navegador
      if (navigator.share) {
        navigator.share({
          title: 'Confesion de '+ quees,
          url: 'https://anonihub.web.app/post?v='+ identifica,
          files: [window.sharedFile],
        })
        .then(contenedor.remove())
        .catch((error) => console.log('Error al compartir', error));
      }
    });
  });
}
export let reaccionesUser = await userUid
export function Boxpost() {
   
    const [filtros, setFiltros] = useState({first: "id", last: "desc"});
    const estado = 1
    const [data, setData] = useState(false);

useEffect(() => {
  const q = query(collection(db, "expocision"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setData(doc.data().exponiendo);
    });
  });

  return () => unsubscribe(); // Deja de escuchar cuando el componente se desmonta
}, []);

return (<>
  
    <div  style={{display:"flex", justifyContent:"left", alignItems:"center"}}>
        
        
        <h1 style={{fontSize:"24px", }}>Hola {stado ? reaccionesUser ? reaccionesUser.username : "":""} </h1>
        {stado?userUid.verificado ? <img width="24px" height="24px" src="verifi.gif" alt="" />: <></> : <></> }
        
    </div>

    <div className="container">
       
        <p>Tus confesiones seran anonimas</p>
        <h1>Confesar algo:</h1>
       {
        data ? (
          <div>Modo Exposición activado</div>
        ) : stado ? (
          <DinamicBox data={userUid} estado={1} />
        ) : (
          <LogOut />
        )
      }
        
        
    </div>
    
    <h1 style={{ fontSize: "20px" }}>Confesiones:</h1>
   
    <div>
        <select onChange={(e) => setFiltros(JSON.parse(e.target.value))}>
            <option value="" hidden>Filtrar Publicaciones</option>
            <option value={JSON.stringify({ first: "id", last: "desc" })}>Mas recientes</option>
            <option value={JSON.stringify({ first: "id", last: "asc" })}>Mas antiguos</option>
            <option value={JSON.stringify({ first: "reaccion", last: "desc" })}>Mas Likes</option>
            <option value={JSON.stringify({ first: "reaccion", last: "asc" })}>Menos Likes</option>
            <option value={JSON.stringify({ first: "coment", last: "desc" })}>Mas comentarios</option>
            <option value={JSON.stringify({ first: "coment", last: "asc" })}>Menos comentarios</option>
        </select>
    </div>
    <Posts filter={filtros}/>
</>)
}

function fNum(num) {
    return num < 10 ? "0" + num : num;
  }

function fechas(mes, dia, hora, minutos) {
    // Obtener fecha actual
    const fecha = new Date();
  
    // Obtener mes actual (0 = Enero, 1 = Febrero, etc.)
    var meslo = fecha.getMonth();
    meslo++;
  
    // Obtener día actual (1 = primer día del mes)
    const dialo = fecha.getDate();
  
    // Obtener hora actual (0-23)
    const horalo = fecha.getHours();
  
    // Obtener minutos actuales (0-59)
    const minutoslo = fecha.getMinutes();
  
    if (meslo == mes && dialo == dia) {
      return "Hoy a las " + fNum(hora) + ":" + fNum(minutos) + "h";
    } else if (meslo === mes && dialo - 1 === dia) {
      // Ayer en el mismo mes
      return "Ayer a las " + fNum(hora) + ":" + fNum(minutos) + "h";
    } else if (meslo - 1 === mes && dialo === 1) {
      // Primer día del mes actual y último día del mes anterior
      return "Ayer a las" + fNum(hora) + ":" + fNum(minutos) + "h";
    } else {
      return (
        fNum(dia) +
        "/" +
        fNum(mes) +
        " a las " +
        fNum(hora) +
        ":" +
        fNum(minutos) +
        "h"
      );
    }
  }


function Posts({filter}) {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [iconos, setIconos] = useState({});
  
    const [limites, setLimite] = useState(state.limite)
    
    let longitud
    const [cambio , setCambio] = useState(false)
    
    useEffect(() => {
  
      setLoading(true);
       
      // Cuando el componente se monta, carga la primera página
      const firstPageUnsubscribe = getFirstPagePosts(({ data, lastVisible }) => {
        let longitudpost = cambio ? posts.length : null
        setPosts(data);
    
        setLastVisible(lastVisible);
        setLoading(false);
        setCambio(false)
        longitud = data.length
        
   
        if (longitud == longitudpost){
          setHasMorePosts(false)
        }
      }, filter);
      
    
      // Devuelve la función de "unsubscribe" para detener la escucha cuando sea necesario
      return () => {
        firstPageUnsubscribe();
      };
    }, [limites, filter]);
  
  
  
  
    return (
      
      <div>
         {loading && <div id="loader"></div>}
        {posts.map((post) => {
    let icono
    let index = -1;
   
    let corazon = post.reaccion
    let verificar
  
      if (stado){
        verificar = reaccionesUser.likes.some(function (like) {
        
        return like == post.id;
      })  
      }
      
      
      let restar = false
      if (verificar) {
        icono ="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
        
      } else{
      icono ="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z";
      }
    
    return (
      <div id="post" key={post.id}>
        <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}>

           <div style={{display:"flex", alignItems:"center" }}>
          <h1>De {post.first}</h1>
       {post.verificado ? <img width="22px" height="22px" src="verifi.gif" alt="" />: <></> }
         <h1>:</h1>
        </div>
       
        <img width="90px" src= {post.universidad == 1 ? "autonomaLogo.png" : post.universidad ==2 ? "utpLogo.png" : ""} alt="" /> 
     
        </div>
       
    
        
        <p>{post.last}</p>

        {(() => {
          switch (post.multimedia) {
            case 1:
              return (
                <>
             
                 
                  <iframe
                    src={
                      "https://open.spotify.com/embed/track/" +
                      post.idmultimedia +
                      "?utm_source=generator&theme=0"
                    }
                    width="100%"
                    height="152"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
               
                </>
              );

            case 2:
              return (
                <>
                  
               
            
                  <iframe
                    width="300"
                    height="200"
                    src={"https://www.youtube.com/embed/" + post.idmultimedia}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                 
            
                </>
              );

            case 3:
              return (
                <> 
                  
                  <img src={post.idmultimedia} alt="Vista previa" width="200" />
                  
                </>
              );


          }
        })()}
        <br />
        <span style={{ fontSize: "12px", margin: "none" }}>
          {fechas(post.mes, post.dia, post.hora, post.minutos)}
        </span>
  
        <div id="interaccion">
          <svg
            onClick={() => {
               if (stado){
                const verificare = reaccionesUser.likes.some(function (like) {
                  index = index + 1;
                  return like == post.id;
                });
                let nuevoCorazon;
                let nuevaReaccion;
    
                if (verificare) {
                  nuevaReaccion = reaccionesUser.likes.splice(index, 1)
                  
                  confeti("😩");
                  toast("Has quitado el like a " + post.first);
                  icono =
                  "M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z"
                  nuevoCorazon = corazon-1;
                } else {
                  nuevaReaccion = reaccionesUser.likes.push(post.id)
                  
                  toast("Has dado like a " + post.first);
                  confeti("❤️");
                  icono ="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                  nuevoCorazon = corazon + 1;
                }
                
               
                  setlikes(post.id, nuevoCorazon);
                  userupdate(reaccionesUser.likes, reaccionesUser.uid)
                  setIconos((prevIconos) => ({
                                ...prevIconos,
                                [post.id]: {
                                  icono: icono,
                                  reaccion: nuevoCorazon,
                                },
                              }));
                
    
                      
                              
    
             
                
             
              }else{
                toast("Debes iniciar sesion para dar like")
               }
             
           }}
  
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d={iconos[post.id] ? iconos[post.id].icono : icono} />
          </svg>
  
          <p>{post.reaccion}</p>
          
          <svg
            onClick={() => {
              window.location.href = 'post?v=' + post.id;
             
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M280-400h400q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Zm594-80 46 45v-525H160v480h594Zm-594 0v-480 480Z" />
          </svg>
         
          <p>{post.coment}</p>
          <svg
            onClick={()=>{
              const container = document.createElement('div');
              container.id= "comparto"
              /* const root = createRoot(container);
              root.render(<Share numero={post.first} descripcion={post.last} />); */
              ReactDOM.render(<Share numero={post.first} descripcion={post.last} uni={post.universidad} />, container);
              document.body.appendChild(container);
              capturarYCompartir(post.id , post.first)

            }}
            
            xmlns="http://www.w3.org/2000/svg"
            height="21"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h80q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560h-80v440h480v-440h-80q-17 0-28.5-11.5T600-600q0-17 11.5-28.5T640-640h80q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-727-36 36q-12 12-28 11.5T348-732q-11-12-11.5-28t11.5-28l104-104q12-12 28-12t28 12l104 104q11 11 11 27.5T612-732q-12 12-28.5 12T555-732l-35-35v407q0 17-11.5 28.5T480-320q-17 0-28.5-11.5T440-360v-407Z" />
          </svg>
        </div>
      </div>
    );
  })}
        {loading && <div id="loader"></div>}
        {(() => {
          if (hasMorePosts) {
            return (
             
              <div id="mas">
               
                
                <button onClick={()=>{
                   state.limite = state.limite + 10
                   setLimite(state.limite)
                   setCambio(true)
                }} disabled={loading}>
                  Mostrar más
                </button>
        
  
              </div>
              
            );
          } else {
            return <p>No hay mas publicaciones</p>;
          }
        })()}
      </div>
    );
  }



export default Boxpost;