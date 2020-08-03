import {componentSignin} from '../views/componentSignin.js';

const component = componentSignin;

export default () =>{

    const root = document.getElementById("root");
    root.innerHTML = component;
    
    const signinFromSignup= document.querySelector('.signup-view');
    signinFromSignup.addEventListener('click',function(){
        window.location.hash = '';
    });
}