// Este es el punto de entrada de tu aplicacion 
// Aquí importamos la función de ruteo 
import{router} from  "./router.js";

const init = () => {
  console.log(window.location.hash); //""
  router(window.location.hash);
  
  window.addEventListener("hashchange", () => {
    console.log(window.location.hash);
      router(window.location.hash);
  });
};

window.addEventListener("load", init); 