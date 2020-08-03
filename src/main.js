// Este es el punto de entrada de tu aplicacion 
// Aquí importamos la función de ruteo 
import{router} from  "./router.js";

const init = () => {
  const templateSignup = document.getElementById('template-signup');
  let content = templateSignup.content;

  router(window.location.hash);
  window.addEventListener("hashchange", () => {
      router(window.location.hash);
      
      console.log(window.location.hash);
  });
};

window.addEventListener("load", init); 