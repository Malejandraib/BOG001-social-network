import {logOutAccount} from "./firebasefunction.js";


export default () =>{
    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const btnLogOut = document.querySelector ('.logout');
    btnLogOut.addEventListener('click', ()=>{
        logOutAccount();
        window.location.hash = '';
        console.log(logOutAccount());
    })
}