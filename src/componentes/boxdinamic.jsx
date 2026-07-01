import { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { agregar, userupdatepost, comentario, setcomentario,stado

 } from "../../firebase";
import { reaccionesUser } from "../screen/inicio";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Mensaje from "../screen/bienvenida";
export function DinamicBox({data , estado, dat}){
    const [image, setImage] = useState(null);
    const [youtubeurl, setYoutubeurl] = useState("https://youtu.be/mOKqNxN4jWM?si=9uzZ-xG79D6o2g89")
    const [spotifyurl, setSpotifyurl] = useState("https://open.spotify.com/intl-es/track/6WGFdJ3lRB7e0VDNEzpiAh?si=00d967d31d3d46ef")
    const [multimedia, setMultimedia] = useState(0);
     const [overlays, setoverlays] = useState(null);
     const [clipboardText, setClipboardText] = useState("");
     const [imageURL, setImageURL] = useState("");
     const [progress, setProgress] = useState(0);
   const [confesion, setConfesion] = useState("");
        var  reaccionesUser= data
       console.log()
       let Loading = overlays ? <>
            <div id="overlay">
            <img width="150px" src= {reaccionesUser.universidad == 1 ? "autonomaLogo.png" : reaccionesUser.universidad ==2 ? "utpLogo.png" : ""} alt="" /> 
                
                <p>publicando</p>
            </div>
        </> : <></>;
         function getSpotifyID(url) {
            return url.split("track/")[1]?.split("?")[0]; 
        }
        function obtenerIdYoutube(url) {
            const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }

        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setImage(URL.createObjectURL(file)); // Mostrar vista previa
                handleUpload(file); // Subir imagen a Firebase
            }
        };
    
        // Subir imagen a Firebase Storage
        const handleUpload = (file) => {
            if (!file) return;
    
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error("Error al subir la imagen:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImageURL(downloadURL);
                    console.log("Imagen disponible en:", downloadURL);
                }
            );
        };

      
    

    
           
               const obtenerPortapapeles = async () => {
              try {
                const texto = await navigator.clipboard.readText();
                return texto
              } catch (err) {
                console.error("Error al acceder al portapapeles:", err);
              }
            };
            console.log(estado);
    return(<>
   
    <div id="chat">
         <div style={{padding: "3px"}} >
          <img onClick={()=>{setMultimedia(2)}}  src="youtube.svg" width="22px" alt="" />
       
        <br />
       <img onClick={()=>{setMultimedia(1)}} src="spotify.svg" width="22px" alt="" />
        <br />
        <img onClick={()=>{setMultimedia(3)}}src="image.svg" width="22px" alt="" />
    </div>
            <textarea
                id="confesion"
                placeholder="Escribe aqui...."
                maxLength="300"
                cols="30"
                rows="4"
                value={confesion}
                    onChange={(e) => setConfesion(e.target.value)}
            ></textarea>
          
                <img
                    src="/send.svg"
                    width={"25px"}
                    height={"25px"}
                    alt=""

                    onClick={async function () {
                      
  
                      if (confesion == "") {
                         console.log("No hay nada que enviar");
                      } else {
                          // Obtener fecha actual
                          const fecha = new Date();
  
                          // Obtener mes actual (0 = Enero, 1 = Febrero, etc.)
                          var mes = fecha.getMonth();
                          mes++;
  
                          // Obtener día actual (1 = primer día del mes)
                          const dia = fecha.getDate();
  
                          // Obtener hora actual (0-23)
                          const hora = fecha.getHours();
  
                          // Obtener minutos actuales (0-59)
                          const minutos = fecha.getMinutes();
                          const tiempo = new Date().getTime();
                          const miid = tiempo.toString() 
                   
                          
                          const posteo = reaccionesUser.post
                         
                         
                            if (multimedia == 3) {
                              setoverlays(true)
                                await handleUpload();
                                if (estado == 1) {
                                await agregar(reaccionesUser.username, confesion,  mes, dia, hora, minutos, miid , reaccionesUser.universidad, reaccionesUser.verificado, multimedia, imageURL);
                                setTimeout(() => {
                                    setoverlays(false)
                                }, 2000)
                                
                                userupdatepost(reaccionesUser.post, reaccionesUser.uid)
                               
                             }
                             else{
                                    comentario(data.username , confesion ,mes, dia, hora, minutos, data.universidad, data.verificado, multimedia, idmulti);
              
                               
                                    
                                    var actual = dat + 1;
                                    await setcomentario(actual);
                                }
                            }else{
                                const idmulti = multimedia == 1 ? getSpotifyID(spotifyurl) : multimedia == 2 ? obtenerIdYoutube(youtubeurl) : null 
                                if (estado == 1) {
                                console.log(confesion)
                                setoverlays(true)
                                await agregar(reaccionesUser.username, confesion,  mes, dia, hora, minutos, miid , reaccionesUser.universidad, reaccionesUser.verificado, multimedia, idmulti);
                                setTimeout(() => {
                                    setoverlays(false)
                                }, 2000)
                                
                                userupdatepost(reaccionesUser.post, reaccionesUser.uid)
                        
                               }else{
                              
                                    comentario(data.username , confesion ,mes, dia, hora, minutos, data.universidad, data.verificado, multimedia, idmulti);
              
                                 
                               
                                    var actual = dat + 1;
                                    await setcomentario(actual);
                               }
                               setConfesion("")
                            }

                             
  
                         /*  publicaiones.push(miid)
                          localStorage.setItem('2mN5xL8pQ4bD3gW6sJ9kA1zRcV7yT0fM', JSON.stringify(publicaiones));
                          console.log(publicaiones) */
                      }
                  }}
                />
                
                 
     </div>

     
        {(() => {
          switch (multimedia) {
            case 1:
              return (
                <>
                <button onClick={()=>{setMultimedia(0)}}>X</button>
               <div id="post">
                 
                  <iframe
                    src={
                      "https://open.spotify.com/embed/track/" +
                      getSpotifyID(spotifyurl) +
                      "?utm_source=generator&theme=0"
                    }
                    width="100%"
                    height="152"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                  <p style={{ fontSize: "13px" }}>Pega el enlace de Spotify aquí:</p>
                  <input
                    type="text"
                    placeholder="Pega aquí el Enlace de Spotify..."
                    maxLength="300"
                    value={spotifyurl}
                    onChange={(e) => setSpotifyurl(e.target.value)}
                  />     <button onClick={async()=>{
                  
                    setSpotifyurl(await obtenerPortapapeles()) }}>
                    <img src="pegar.svg"  alt="" />
                  </button></div>
                </>
              );

            case 2:
              return (
                <>
                     <button onClick={()=>{setMultimedia(0)}}>X</button>
                <div id="post">
            
                  <iframe
                    width="300"
                    height="200"
                    src={"https://www.youtube.com/embed/" + obtenerIdYoutube(youtubeurl)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p style={{ fontSize: "13px" }}>Pega el enlace de YouTube aquí:</p>
                  <input
                    type="text"
                    placeholder="Pega aquí el Enlace de YouTube..."
                    maxLength="300"
                    value={youtubeurl}
                    onChange={(e) => setYoutubeurl(e.target.value)}
                  />
                  <button  onClick={async()=>{
                  
                  setYoutubeurl(await obtenerPortapapeles()) }}>
                  <img src="pegar.svg"  alt="" />
                </button>
             </div>
                </>
              );

            case 3:
              return (
                <> <button onClick={()=>{setMultimedia(0)}}>X</button >
                <div id="post">
               
                   <p>Por seguridad esta función está deshabilitada temporalmente</p>
               </div> </>
              );


          }
        })()}
     {Loading} 
       
    </>)
}

export function LogOut(){
  return( <div id="post">
         <Mensaje/>
  </div>
  )
}