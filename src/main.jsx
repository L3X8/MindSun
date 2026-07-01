import React from "react";
import ReactDOM from "react-dom/client";
import {
  App,
  Lectura,
  Cpost,
  Coment
} from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { agregar, querySnapshot, ids, setid, leer } from "../firebase";
window.addEventListener("load", function() {
  console.log("cargo")
  
  
})

import Mensaje from "./screen/bienvenida.jsx";
import Comentarios from "./screen/coments.jsx";

/* function detectDevTool() {
  const time = 10;
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > time) {
    console.log("devTool open")
    window.location.href = "https://www.youtube.com/watch?v=by2P958ft7k";

    return true;
  }
  console.log("devTool NOT open")
  return false;
}
setInterval(detectDevTool, 1000); */

export const routes = [
  {
    path: "",
    element:
        <App />
    ,
  },
];

var pathe = window.location.pathname;
var partesDeLaRuta = pathe.split("/");

// Obtener la última parte de la ruta
var ultimaParteDeLaRuta = partesDeLaRuta[partesDeLaRuta.length - 1];



routes.push({
  path: "post",
  element: (
     <Comentarios/>
  ),
},{
  path: "merux",
  element: (
   <Mensaje/>
  ),
});






const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
