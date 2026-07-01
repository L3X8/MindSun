/* importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCdsAJo7fWnSneVV2knYdbXpgHZD1mth-A",
    authDomain: "lexu-b5d49.firebaseapp.com",
    databaseURL: "https://lexu-b5d49-default-rtdb.firebaseio.com",
    projectId: "lexu-b5d49",
    storageBucket: "lexu-b5d49.appspot.com",
    messagingSenderId: "792948949046",
    appId: "1:792948949046:web:ad72ea97663288d052d897",
    measurementId: "G-5RSREBN7W3"
});

const messaging = firebase.messaging();

export async function requestPermission() {
    try {
        const token = await messaging.getToken({ vapidKey: 'BIPsLrBx2uuGIPG8dnFJuaJQljz7lz5C30kGP4gCR6-JbVc9CGPmVZfj29scH4TD3bxxJPS8ROK8h1oqHhMneDo' });
        console.log('FCM Token:', token);
  
    } catch (err) {
        console.error('Unable to get permission to notify.', err);
    }
} */