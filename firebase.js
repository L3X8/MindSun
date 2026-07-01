// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {  getFirestore,
  getDocs,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  startAfter,
  limit,
  updateDoc,
  runTransaction} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { getMessaging, getToken } from 'firebase/messaging';
import JSConfetti from 'js-confetti'
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const jsConfetti = new JSConfetti()
export function confeti(emogi){
  jsConfetti.addConfetti({
  emojis: [emogi],
  emojiSize: 60,
  confettiNumber: 10,
})
}


import React from "react";
const firebaseConfig = {
  apiKey: "AIzaSyCdsAJo7fWnSneVV2knYdbXpgHZD1mth-A",
  authDomain: "lexu-b5d49.firebaseapp.com",
  databaseURL: "https://lexu-b5d49-default-rtdb.firebaseio.com",
  projectId: "lexu-b5d49",
  storageBucket: "lexu-b5d49.appspot.com",
  messagingSenderId: "792948949046",
  appId: "1:792948949046:web:ad72ea97663288d052d897",
  measurementId: "G-5RSREBN7W3",
};
                 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export let stado = true
export let userUid = null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export let user = null;
export const storage = getStorage(app);
/* const messaging = getMessaging(app) */

export async function requestPermission(fcm) {
  try {
      const token = await getToken(messaging,{ vapidKey: 'BIPsLrBx2uuGIPG8dnFJuaJQljz7lz5C30kGP4gCR6-JbVc9CGPmVZfj29scH4TD3bxxJPS8ROK8h1oqHhMneDo' });
      console.log('FCM Token:', token);
      const docRef = doc(db, "usuarios", fcm)
      updateDoc(docRef,{notificacion: token})

  } catch (err) {
      console.error('Unable to get permission to notify.', err);
  }
}



  onAuthStateChanged(auth, async (user) => {
    if (user) {
   
      const uid = user.uid;
      
      const docRef = doc(db, "usuarios", uid);
      onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
              userUid = docSnapshot.data(); 
             
          } else {
              console.log("No se encontró el documento.");
          }
      }, (error) => {
          console.error("Error al obtener el documento en tiempo real:", error);
      });
      
      
    } else {
    
      console.log('Usuario no autenticado');
      stado = false
      
    
      }
  });
  
 
export async function registro (seleccion){
  
    const userCredential = await signInAnonymously(auth);

    const uid = userCredential.user.uid;
  
    console.log('UID del usuario guardado en Firestore');
    let iduser

    try {
      await runTransaction(db, async (t) => {
        
        const docRef = doc(db, "identificador", "userid");
        const docSnap = await t.get(docRef);
        const idcamp = docSnap.data().idcamp;
        const userRef = doc(db, 'usuarios', uid);
        iduser = idcamp + 1;
        await t.update(docRef, { idcamp: iduser });
  
       
       await setDoc(userRef, { uid, username: "Anonimo" + iduser, post: [], likes: [] , universidad : seleccion, verificado: false});
      
       var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/lexu-b5d49.appspot.com/o/Message.mp3?alt=media&token=e0aa9817-273e-44f7-8589-76475c4eb58d');
  
      const updatedDocRef = doc(db, "usuarios", uid);
      userUid = await getDoc(updatedDocRef);
  

       
        jsConfetti.addConfetti({
          emojis: ['😅', '😊', '🙈', '😳','😮'],
          emojiSize: 150,
          confettiNumber: 20,
        })
        audio.play()
        
         
        setTimeout(()=>{
          window.location.href = "/";
        },2000)
    
      });
      
      console.log('datos cargados '+ userUid.data().username);
    } catch (e) {
      console.log('Error en la transacción:', e);
    }
  
  }


// Add the public key generated from the 


export async function agregar(
  names,
  descripcion,
  
  mes,
  dia,
  hora,
  minutos,
  
  identi,
  seleccion,
  verificacion,
  multimedia,
  idmultimedia
) {
  
  const identificadorDocRef = doc(
    collection(db, "publicaciones"),
    identi
  );
  await setDoc(identificadorDocRef, {
    first: names,
    last: descripcion,
    id: identi,
    coment: 0,
    mes: mes,
    dia: dia,
    hora: hora,
    minutos: minutos,
    reaccion: 0,
    universidad: seleccion,
    verificado: verificacion,
    multimedia: multimedia,
    idmultimedia: idmultimedia
    
  });
   
  console.log("Confesion Publicada ✅");
  let overlay = document.getElementById("overlay")
  var miParrafo = document.querySelector("#overlay p");
  overlay.classList.add("active")
  miParrafo.textContent = "Exito"
  miParrafo.style.color = "green"
  var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/lexu-b5d49.appspot.com/o/Message.mp3?alt=media&token=e0aa9817-273e-44f7-8589-76475c4eb58d');
  
  jsConfetti.addConfetti({
    emojis: ['😅', '😊', '🙈', '😳','😮'],
    emojiSize: 100,
    confettiNumber: 20,
  })
  audio.play()
  
   
  setTimeout(()=>{
   overlay.classList.remove("active")
  },1000)
}

export const querySnapshot = await getDocs(
  query(
    collection(db, "publicaciones"),
    orderBy("id", "desc"), // Reemplaza 'tuCampoOrdenado' con el campo por el cual deseas ordenar

  )
);

export var ids;
export const obtenerid = await getDocs(collection(db, "identificador"));
obtenerid.docs.map((doc) => {
  ids = doc.data().idcamp;
});

export function setid(identi) {
  const identificadorDocRef = doc(collection(db, "identificador"), "userid");
  setDoc(identificadorDocRef, {
    idcamp: identi,
  });
}

export async function leer(code) {
  const docRef = doc(db, "publicaciones", code);

  const docSnap = await getDoc(docRef);

  return docSnap;
}

export function leerEnTiempoReal(code, setDatos , setExiste) {
  const docRef = doc(db, "publicaciones", code);

  // Escuchar cambios en tiempo real
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const datosDelDocumento = docSnap.data();
      setDatos(datosDelDocumento); // Actualiza los datos con los datos del documento
    } else {
      setExiste(false); // Indica que el documento no existe
    }
  }, (error) => {
    console.error('Error al obtener datos:', error);
  });

  // Retorna la función de desuscripción para que pueda ser llamada cuando ya no se necesite escuchar los cambios
  return unsubscribe;
}

export async function userupdate(data, uid) {
  const docRef = doc(db, "usuarios", uid);

  updateDoc(docRef, {likes: data})
}

export async function userupdatepost(data, uid) {
  const docRef = doc(db, "usuarios", uid);

  updateDoc(docRef, {post: data})
}


var pathe = window.location.pathname;
var partesDeLaRuta = pathe.split("/");

// Obtener la última parte de la ruta
var ultimaParteDeLaRuta = partesDeLaRuta[partesDeLaRuta.length - 1];

var urlActual = new URL(window.location.href);

// Obtener el valor del parámetro 'v' de la URL
var id = urlActual.searchParams.get('v')

export async function comentario(names, descripcion ,mes, dia, hora,minutos, seleccion, verificacion , multimedia , idmultimedia) {
  try {
    const tiempo = new Date().getTime();
    const identificadorDocRef = doc(
      collection(db, "publicaciones/" + id + "/comentario"),
      tiempo.toString()
    );

    // Utiliza await para esperar a que la operación de escritura se complete
    await setDoc(identificadorDocRef, {
      first: names,
      last: descripcion,
     
      
      mes: mes,
      dia: dia,
      hora: hora,
      minutos: minutos,
    
      universidad: seleccion,
      verificado: verificacion,
      multimedia: multimedia,
      idmultimedia: idmultimedia
    });
   
    // Puedes hacer más acciones aquí después de que se haya subido correctamente
  } catch (error) {
    console.error("Error al subir comentario:", error);
    // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
  }
}
export var comentariosSnapshot;
export var unSub;

var urlActual = new URL(window.location.href);

// Obtener el valor del parámetro 'v' de la URL
var id = urlActual.searchParams.get('v')
if (pathe !== "/") {
  comentariosSnapshot =
    collection(db, "publicaciones/" + id + "/comentario")
  ;
}

export async function setcomentario(nuevo) {
  const identificadorDocRef = doc(
    collection(db, "publicaciones"),
    id
  );

  // Obtener los datos actuales del documento antes de la actualización
  const docSnapshot = await getDoc(identificadorDocRef);
  const datosActuales = docSnapshot.data();

  // Combinar los datos actuales con el nuevo comentario
  const nuevosDatos = { ...datosActuales, coment: nuevo };

  // Actualizar el documento con los nuevos datos
  setDoc(identificadorDocRef, nuevosDatos);
}

export async function setlikes(ruta, actual) {
  const identificadorDocRef = doc(
    collection(db, "publicaciones"),
    ruta
  );

 
    await updateDoc(identificadorDocRef, {
      reaccion:actual
    });

}



export const state = {
  limite: 10,
};
export const getFirstPagePosts = (callback, filtros) => {
  let firstPageQuery = query(
    collection(db, "publicaciones"),
    orderBy(filtros.first, filtros.last),
    limit(state.limite)
  );

  const unsubscribe = onSnapshot(firstPageQuery, (snapshot) => {
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const data = snapshot.docs.map((doc) => doc.data());
    callback({ data, lastVisible });
  });

  // Retorna la función de "unsubscribe" para detener la escucha cuando sea necesario
  return unsubscribe;
};




export const getNextPagePosts = (lastVisible, callback) => {
  const nextPageQuery = query(
    collection(db, "publicaciones"),
    orderBy("reaccion"),
    startAfter(lastVisible),
    limit(1)
  );

  const unsubscribe = onSnapshot(nextPageQuery, (snapshot) => {
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
    const data = snapshot.docs.map((doc) => doc.data());
    callback({ data, lastVisible: newLastVisible });
  });

  // Retorna la función de "unsubscribe" para detener la escucha cuando sea necesario
  return unsubscribe;
};

export async function loginGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const uid = result.user.uid;

    const userRef = doc(db, "usuarios", uid);

    const existe = await getDoc(userRef);

    if (!existe.exists()) {
      await setDoc(userRef, {
        uid: uid,
        username: result.user.displayName,
        email: result.user.email,
        post: [],
        likes: [],
        universidad: 0,
        verificado: true
      });
    }

    return result.user;

  } catch (error) {
    console.error(error);
  }
}

import { signOut } from "firebase/auth";

export async function cerrarSesion() {
    await signOut(auth);
}