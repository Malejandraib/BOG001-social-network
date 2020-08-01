// Este es el punto de entrada de tu aplicacion
import { myFunction } from "./lib/index.js"; myFunction();
import{router} from  "./router.js";

const botoncito = document.querySelector(".signin-view");
console.log(botoncito);

console.log(window.location.hash);


const init = () => {
  router(window.location.hash);
  window.addEventListener("hashchange", () => {
      router(window.location.hash);
      console.log(window.location.hash);
  });
};

window.addEventListener("load", init); 