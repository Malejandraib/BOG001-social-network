import {componentSignup} from '../views/componentSignUp.js';
import {createUserEmailAndPassword} from "./firebasefunction.js"

const template = componentSignup;

export default () =>{
    const root = document.getElementById("root");
    root.innerHTML = componentSignup;

    const signupForm = document.querySelector('#signup-form');
    const passwordValidation = document.querySelector('.password-signup');
    const msjEmailVer = document.querySelector('#verification-email');
    const msjVerification= document.querySelector('#verification-password');
    const registerWithGoogle = document.querySelector('.btn-signin-google');

    //Verificacion de contraseña
    passwordValidation.addEventListener('blur', verification);
    function verification(){
        const newPassword = passwordValidation.value;
        const upperCaseLetters = /[A-Z]/g;
        const lowerCaseLetters = /[a-z]/g;
        const numbers = /[0-9]/g;  
        if (newPassword.length < 6 || numbers.test(newPassword) == false || lowerCaseLetters.test(newPassword) == false || upperCaseLetters.test(newPassword) == false){    
            msjVerification.classList.remove('hide');
            msjVerification.textContent = "Password must contain at least 6 characters, one number and one letter in uppercase.";
        }
        else{
        msjVerification.classList.add('hide');
        }
    };

    //Enviar formulario con email y password, para crear nuevo usuario 
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector(".email-signup").value;
        const password = document.querySelector(".password-signup").value;
        console.log(email);
        console.log(password);
        console.log(createUserEmailAndPassword());
        createUserEmailAndPassword(email,password);
    });

    //signup with google and login 
    registerWithGoogle.addEventListener("click", googleRegister);
    function googleRegister(e) {
        e.preventDefault();
        signupForm.reset();
        //aqui va el change al otro html
        const provider = new firebase.auth.GoogleAuthProvider();
        registerGoogle(provider);
    }
    

    const signinFromSignup= document.querySelector('.signin-view');
    signinFromSignup.addEventListener('click',function(){
        window.location.hash = 'signin';
    });

}