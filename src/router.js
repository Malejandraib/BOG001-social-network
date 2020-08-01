import {pages} from './lib/index.js';
import indexHtml from '/index.html';
import signup from './views/signup.html';

let root = document.getElementById("root");
let sigupHtml = sigup;
console.log(sigupHtml);

export const router = async (route) =>{
    let content = document.getElementById("root");
    content.innerHTML = "";
    console.log(content);
    console.log(route);

    switch(route) {
        case '':
            return content.appendChild(pages.signup());
            root.innerHTML = 'sigupHtml';
        case "signin":
            return  content.innerHTML = "<button>Hola</button>";
        case '#signin':
            return content.innerHTML = "home";
        case '#timeline':
            return content.innerHTML = "otro";
        default:
          // code block
    }
}

