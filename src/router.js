//Aquí importamos el objeto que manipula los js de las vistas 
import { myFunction } from "./lib/index.js"; myFunction();
import signup from './lib/signup.js';
import signin from './lib/signin.js';

const pages = {
    signup: signup,
    signin: signin,
};

export const router = (route) =>{
    let root = document.getElementById('root');
    root.innerHTML = "";
    
    switch(route) {
        case '':
            return pages.signup();
        case '#signin':
            return pages.signin();
        default:
          // code block
    }
}

