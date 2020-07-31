import {pages} from './lib/index.js'


export const router = async (route) =>{
    let content = document.getElementById("root");
    content.innerHTML = "";
    console.log(route);

    switch(route) {
        case '#/':
          //la idea es poner aquí la función que nos pinte el html final
            return content.appendChild(pages.signup());
        case "/SignIn":
            return  content.innerHTML = "start";
        case '/':
            return content.innerHTML = "home";
        default:
          // code block
    }
}

