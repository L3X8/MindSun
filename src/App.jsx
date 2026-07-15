import { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';

import "./App.css";

import {
  comentario,
  comentariosSnapshot,
  setcomentario,
  confeti,
  setlikes,
  userupdate,
  userUid,
  leerEnTiempoReal,
  stado
} from "../firebase";
import Boxpost from "./screen/inicio";
import Flure from "./screen/ghost";
import Usuario from "./screen/cuenta";
import {Toaster, toast} from "sonner"
import Tienda from "./screen/shop";
import Share from "./screen/sharing";
import { onSnapshot } from "firebase/firestore";
import CommentBox from "./screen/box";
import {DinamicBox} from "./componentes/boxdinamic";
import Mensaje from "./screen/bienvenida";


const quitardiv = document.getElementById("carga");

const anim = document.getElementById("root")
  quitardiv.classList.add("active")
  anim.classList.add("activ")
  setTimeout(() =>{
    quitardiv.remove();
  },500)


//Inicio de la programacion de temas 
    const elemento = document.getElementById("theme");
    export var tema = 0;
    export var colores = ["#74d7cb", "#f6b0ea", "#e1ea8d", "#ffb4a1", "#b697e4", "#becab8", "#8eebb2", "#aac7ff", "#dec663"];
    export var fondo = ["#051f1d", "#271624", "#1b1d07", "#2c150f", "#1f1925", "#111f0f", "#0c1f14", "#131c2b", "#221b00"];
    var valortema = localStorage.getItem("3nS2cKd9LgXwA5yH8jR7eZ1rPbVtQ6mF");

    if (valortema !== null) {
      tema = Number(valortema);
    } else {
      localStorage.setItem("3nS2cKd9LgXwA5yH8jR7eZ1rPbVtQ6mF", 1);
    }
/* 
    elemento.style.setProperty("--materialyou", "#633663");
    elemento.style.setProperty("--colorfondo", "#fac1eb"); */
//Fin de la progrmacion de temas


export function App() {
  const [barras, setBarras] = useState(0);
  const [notificacion , setNotificacion] = useState(false)
  
  const handleBotonClick = (valor) => {
    if (stado){
      setBarras(valor);
    }else
    {
      toast("Inicia sesion para continuar")
    }
    
  };
  /* useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === 'granted') {
        console.log('El permiso de notificaciones ya está concedido.');
        setNotificacion(true);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                setNotificacion(true);
            } else {
                setNotificacion(false);
            }
        });
    } else {
        setNotificacion(false);
    }
  } else {
      console.error("El navegador no soporta la API de notificaciones");
  }
      
    
}, []); */
  return ( 
  <>   <Toaster 
  position="top"
  duration={1000}
  toastOptions={{
  style: { background: colores[tema], border:"none" ,   pointerEvents: "none"},
  className: 'my-toast',
}}/>

  

  
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" ,}}>
{/*   <img  onClick={() =>handleBotonClick(0)}style={{width: "30px" , margin: "5px"}} src="logo.webp" alt="" /> */}
   <h1 style={{fontSize:"25px"}}>MindMoon</h1>
        <   img  width={"40px"} src="/user2.svg" alt=""  onClick={() =>handleBotonClick(1)} />         
     

  </div>
  

    <div id="menu">
      <button  onClick={() => handleBotonClick(0)}>
       Inicio
      </button> 

      {/* <button  onClick={() => handleBotonClick(3)}>
        <img  width={"25px"} src="/ghost.svg" alt="" />
      </button> */}

     {/*  <button  onClick={() =>handleBotonClick(4)}>
        <img  width={"25px"} src="/shop.png" alt="" />         
      </button>
 */}
      <button  onClick={() => handleBotonClick(2)}>
        Ajustes
      </button>  
    </div>
  
    <Navigation barrasa={barras} />
  </>
  ); 
}


export function Navigation({ barrasa}) {
  

  switch(barrasa){
    case 0:
      return (
        <Boxpost/>
      );
      break;
    case 1:
      return(<Usuario/>)
      
      break;
    case 2:
      return(
      <Theme/>)
      break;
   
    case 3:return(<Flure/>)
      break;
      
    case 4: return(<Tienda/>)
  }
 
}
var vara;
function fNum(num) {
  return num < 10 ? "0" + num : num;
}
var cantidad;

var url;
export var dato;




function capturarYCompartir(identifica , quees) {
  toast("compartiendo")
  const contenedor = document.getElementById('comparto');

  // Captura con html2canvas
  html2canvas(contenedor, {backgroundColor: "rgba(0,0,0,0)"}).then(function(canvas) {
    // Guarda la captura como blob
    canvas.toBlob(function(blob) {
      const file = new File([blob], 'captura.png', { type: 'image/png' });
      
      // Guarda el blob en una variable global para ser utilizado por las funciones específicas
      window.sharedFile = file;

      // Muestra la barra de compartir si está disponible en el navegador
      if (navigator.share) {
        navigator.share({
          title: 'Confesion de'+ quees,
          url: 'https://anonihub.web.app/post?v='+ identifica,
          files: [window.sharedFile],
        })
        .then(() => contenedor.remove())
        .catch((error) => console.log('Error al compartir', error));
      }
    });
  });
}

function capturar() {
  html2canvas(document.getElementById('comparto'), {
    allowTaint: true,
    useCORS: true,
    backgroundColor: 'none'
  }).then(function(canvas) {
    // `canvas` contiene la captura, ahora puedes hacer lo que quieras con ella
    document.body.appendChild(canvas);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Convierte el canvas a un data URL con formato PNG
    link.download = 'captura.png';

    // Simula un clic en el enlace para iniciar la descarga
    link.click();
  });
}


var dat 
export function Lectura({ code , reccionid, layer=1}) {
  const [datos, setDatos] = useState(null);
  const [existe, setExiste] = useState(true);
  const [iconos, setIconos] = useState({});
  const [botonTexto, setBotonTexto] = useState('Eliminar');
  useEffect(() => {
    const unsubscribe = leerEnTiempoReal(code, setDatos, setExiste);

    // Limpieza al desmontar el componente para dejar de escuchar los cambios
    return () => unsubscribe();
  }, [code]);
  function fechas() {
    if (!datos) return "";
    
    const { mes, dia, hora, minutos } = datos;
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    const diaActual = fechaActual.getDate();

    if (mesActual === mes && diaActual === dia) {
      return `Hoy a las ${fNum(hora)}:${fNum(minutos)}h`;
    } else if (mesActual === mes && diaActual - 1 === dia) {
      return `Ayer a las ${fNum(hora)}:${fNum(minutos)}h`;
    } else if (mesActual - 1 === mes && diaActual === 1) {
      return `Ayer a las ${fNum(hora)}:${fNum(minutos)}h`;
    } else {
      return `${fNum(dia)}/${fNum(mes)} a las ${fNum(hora)}:${fNum(minutos)}h`;
    }
  }
  let indexl;
  let corazonl;
  let verificar;
  let icon;
  if (existe == true) {
    return (
      <div id="post">
        {datos && reccionid ? (
          dat = datos.coment,
          indexl = -1,
 
          corazonl = datos.reaccion,
          
          verificar = reccionid.some(function (like) {
      
            return like == datos.id;
          }),

          icon = verificar ? "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z":"M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z",
          <> 
          
          <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}>

            <div style={{display:"flex"}}>
           
           
           <h1>De {datos.first}</h1>
         
           {datos.verificado ? <img width="24px" height="24px" src="verifi.gif" alt="" />: <></> }
           <h1>:</h1>    
        </div>
           
            <img width="90px" src= {datos.universidad == 1 ? "autonomaLogo.png" : datos.universidad ==2 ? "utpLogo.png" : ""} alt="" />
           

        </div>
          
          
          
          
          
       
            <p>{datos.last}</p>

            {(() => {
          switch (datos.multimedia) {
            case 1:
              return (
                <>
             
                 
                  <iframe
                    src={
                      "https://open.spotify.com/embed/track/" +
                      datos.idmultimedia +
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
                    src={"https://www.youtube.com/embed/" + datos.idmultimedia}
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
                  
                  <img src={datos.idmultimedia} alt="Vista previa" width="200" />
                  
                </>
              );


          }
        })()}
        <br />
            <span style={{  fontSize: "12px", margin: "none" }}>
              {fechas()}
            </span>
            <div id="interaccion">
            <svg
          onClick={() => {
            

            const verificare = reccionid.some(function (like) {
              indexl = indexl + 1;
              return like == datos.id;
            });
            let nuevoCorazon;
              let nuevaReaccion;
  
              if (verificare) {
                nuevaReaccion = reccionid.splice(indexl, 1)
                
                confeti("😩");
                toast("has quitado el like a " + datos.id);
                icon =
                "M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z"
                nuevoCorazon = corazonl-1;
              } else {
                nuevaReaccion = reccionid.push(datos.id)
                
                toast("has dado like a " + datos.id);
                confeti("❤️");
                icon ="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                nuevoCorazon = corazonl + 1;
              }
              
              console.log(userUid.likes)
                setlikes(datos.id, nuevoCorazon);
                userupdate(reccionid, userUid.uid)
              setIconos((prevIconos) => ({
                            ...prevIconos,
                            [datos.id]: {
                              icono: icon,
                              reaccion: nuevoCorazon,
                            },
                          }));
            

          
       
                          

         
            
         
          }}

          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d={iconos[datos.id] ? iconos[datos.id].icono : icon} />
        </svg>

        <p>{iconos[datos.id] ? iconos[datos.id].reaccion : datos.reaccion}</p>

              <svg
              onClick={() => {
                
                window.location.href = 'post?v=' + datos.id;
                // rutas(url , dato)
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
            <path d="M280-400h400q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Zm594-80 46 45v-525H160v480h594Zm-594 0v-480 480Z" />
          </svg>
              <p>{datos.coment}</p>
              <svg
               onClick={()=>{
                const container = document.createElement('div');
                container.id= "comparto"
      
      ReactDOM.render(<Share numero={datos.first} descripcion={datos.last} uni={datos.universidad} verificado={datos.verificado}/>, container);
    
      
      document.body.appendChild(container);
      capturarYCompartir(datos.id , datos.first)
               }}    

              stroke={colores}
              xmlns="http://www.w3.org/2000/svg"
              height="21"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h80q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560h-80v440h480v-440h-80q-17 0-28.5-11.5T600-600q0-17 11.5-28.5T640-640h80q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-727-36 36q-12 12-28 11.5T348-732q-11-12-11.5-28t11.5-28l104-104q12-12 28-12t28 12l104 104q11 11 11 27.5T612-732q-12 12-28.5 12T555-732l-35-35v407q0 17-11.5 28.5T480-320q-17 0-28.5-11.5T440-360v-407Z" />
            </svg>
            </div>
          </>
        ) : (
          <>
            <p>Cargando datos...</p>
            <div id="loader"></div>
          </>
        )}
       {layer === 1 && (
    <> 
    <div id="caja">
          <Cpost />
        </div>
        {stado? <DinamicBox data={userUid} estado={2} dat={dat} /> : <Mensaje/>}
        
    </>
)}
        
      </div>
      
    );
  } else {
    return (<div id="post">
      <h1>De ?¿?¿?:</h1>
      <p>"Esta publicaciones fue eliminada o no existe"</p>
  
      
    </div>);
  }
}

export function Coment() {
  return (
    <> <Toaster 
    position="top-rigth"
    duration={1000}
   
   
    toastOptions={{
     style: { background: colores[tema], border:"none" ,   pointerEvents: "none",},
     className: 'my-toast',
   }}/>

      <div id="chat">
        <textarea
          id="confesion"
          placeholder="escribe aqui"
          maxLength="300"
          cols="30"
          rows="4"
        ></textarea>
        <br />
        <button
          onClick={async function () {
            const valor = document.getElementById("confesion");

            if (valor.value == "") {
              toast("Escribe algo para publicar");
            } else {
              comentario(userUid.username , valor.value , userUid.universidad, userUid.verificado);
              
              toast('Publicando...');
              valor.value = "";
              var actual = dat + 1;
              await setcomentario(actual);
         
              toast.success("comentario publicado");
              
              
            }
          }}
        >
          <img
            src="send.svg"
            width={"30px"}
            height={"30px"}
            alt=""
          />
        </button>
      </div>
      
    </>
  );
}

export function Cpost() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    
    const unsubscribe = onSnapshot(comentariosSnapshot, (snapshot) => {
      const comentariosData = snapshot.docs.map((doc) => {
        const post = doc.data();

        return (
          <div id="comentarios" key={post.id}>
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
                    width="250"
                    height="150"
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
                  
                  <img src={post.idmultimedia} alt="Vista previa" width="170" />
                  
                </>
              );


          }
        })()}
        <br />
        
        </div>
        );
      });
      setComentarios(comentariosData);
    });

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, []);

  return <div>{comentarios}</div>;
  
}


function temase(valore = 0) {
  tema = valore;
  elemento.style.setProperty("--materialyou", colores[tema]);

  elemento.style.setProperty("--colorfondo", fondo[tema]);
}

console.log();
export function Theme() {
  const [botonSeleccionado, setBotonSeleccionado] = useState(Number(tema));

  const temas = (indice) => {
    // Agregar la lógica que desees al seleccionar un tema

    console.log(`Seleccionaste el tema ${indice}`);
  };

  return (
    < >
      <div className="container">
        <h1>Temas:</h1>
      </div>

      <div className="container">
        {colores.map((color, indice) => (
          <button
            key={indice}
            style={{ borderRadius: "11px",
              backgroundColor: color,
              border: botonSeleccionado === indice ? "3px solid red" : "none",
              width: "80px",
              height: "80px",
              margin:"5px",
              cursor: "pointer",
            }}
            onClick={() => {
              temase(indice);
              localStorage.setItem("3nS2cKd9LgXwA5yH8jR7eZ1rPbVtQ6mF", indice);
              setBotonSeleccionado(indice);
            }}
          >
            <img src="https://i.imgur.com/VTJwoZj.png" alt="" />
          </button>
        ))}
      </div>

      
    </>
  );
}

export function Ajustes() {
  return (
    <div>
      <h1>Tu id:</h1>
    </div>
  );
}
