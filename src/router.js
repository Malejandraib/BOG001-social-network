//Aquí importamos el objeto que manipula los js de las vistas 
import { myFunction } from "./lib/index.js"; myFunction();
import signup from './lib/signup.js';
import signin from './lib/signin.js';

const pages = {
    signup: signup,
    signin: signin,
};

export const router = async (route) =>{
    let content = document.getElementById("root");
    content.innerHTML = "";
    console.log(content);
    console.log(route);

    switch(route) {
        case '':
            return content.appendChild(await pages.signup());
        case '#signin':
            return content.appendChild( pages.signin());
        default:
          // code block
    }
}

