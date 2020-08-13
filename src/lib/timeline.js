import {logOutAccount} from "./firebasefunction.js";
// import {changeState} from "./firebasefunction.js";


export default () =>{

    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    // console.log(changeState);

    // if (changeState === null){
    //     console.log(changeState)
    //     window.location.hash = 'notfound';
    // }else{
    //     window.location.hash = 'timeline';
    // }

    const btnLogOut = document.querySelectorAll('.logout');
    
    btnLogOut.forEach (item => {
        item.addEventListener('click', ()=>{
            logOutAccount();
            window.location.hash = '';
            console.log(logOutAccount());
        });
    });
};