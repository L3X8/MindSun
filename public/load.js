
const quitardiv = document.getElementById("carga"); 
var pathe = window.location.pathname;
const loading = document.getElementById("loader")


/* if(pathe == "/") {
  loading.remove()
window.addEventListener("load", function() {
  
  setTimeout(() =>{
    quitardiv.classList.add("active")
    setTimeout(() =>{
      quitardiv.remove();
      
    },500)
  },2000)
  
  
  
})}else{
  quitardiv.remove()
  window.addEventListener("load", function() {
    setTimeout(() =>{
        loading.remove();
      },2000)

    })

}
 */

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
})
