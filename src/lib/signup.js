import {createUserEmailAndPassword, registerGoogle, logOutAccount, changeState} from "./firebasefunction.js"

export default () =>{
    
    const template = document.querySelector("#template-signup");
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);
    
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
        msjVerifcatiogn.classList.add('hide');
        }
    };

    //Enviar formulario con email y password, para crear nuevo usuario 
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector(".email-signup").value;
        const password = document.querySelector(".password-signup").value;
        const signUp = await createUserEmailAndPassword(email,password);
        //changeState(signUp)
        
        msjEmailVer.innerHTML = signUp;
    });
    
    //SignIn with google 
    registerWithGoogle.addEventListener("click", async (e) => {
        e.preventDefault();
        signupForm.reset();
        const provider = new firebase.auth.GoogleAuthProvider();
        const signinGoogle = await registerGoogle(provider);
        //changeState(signinGoogle)
    });

    //Entramos en timeline
    changeState()

/*     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.hash = 'timeline';
            console.log(user.displayName);
            console.log(user);
        } else {
            console.log("nope");
        }
    }); */

        //Changing page to signIn
        const signinFromSignup= document.querySelector('.signin-view');
        signinFromSignup.addEventListener('click',() => {
            window.location.hash = 'signin';
        });

    //logOutAccount();

};

