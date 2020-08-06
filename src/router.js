//Aquí importamos el objeto que manipula los js de las vistas 
import { myFunction } from "./lib/index.js"; myFunction();
import signup from './lib/signup.js';
import signin from './lib/signin.js';

const pages = {
    signup: signup,
    signin: signin,
};

export const router = (route) =>{
    let content = document.getElementById('root');
    content.innerHTML = "";
    
    switch(route) {
        case '':
            return pages.signup();
        case '#signin':
            return pages.signin();
        case '#timeline':
            return content.innerHTML = "Bienvenido a Timeline";
        default:
          // code block
    }
}

