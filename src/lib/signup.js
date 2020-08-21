import {createUserEmailAndPassword, registerGoogle} from "./firebasefunction.js"

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
        msjVerification.classList.add('hide');
        }
    };

    //Enviar formulario con email y password, para crear nuevo usuario 
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector(".email-signup").value;
        const password = document.querySelector(".password-signup").value;
        const nameForm = document.querySelector('.name-signup').value;
        const signUp = await createUserEmailAndPassword(email,password); //aquí nació porque fue el return si no, salen los errores

        msjEmailVer.innerHTML = signUp; //ese objeto grande que viene de firebase, acá los imprimios

        var user = firebase.auth().currentUser; //null u objeto // identifoicar persona activo 

        console.log(user); 

        if (user != null) {

            db.collection('users').doc(user.uid).set({
                name: nameForm,
                email: user.email,
                photoURL: "../images/pic2.jpg", //foto por default 
                uid: user.uid
            });


        };
    });

    
    //SignIn with google 
    registerWithGoogle.addEventListener("click", async (e) => {
        e.preventDefault();
        signupForm.reset();
        const provider = new firebase.auth.GoogleAuthProvider();
        const signinGoogle = await registerGoogle(provider);
        
        var user = firebase.auth().currentUser; //null u objeto

        console.log(user);           //null u name
        
        if (user != null) {
            
            db.collection('users').doc(user.uid).set({
                name: user.displayName,
                email:user.email,
                photoURL:user.photoURL,
                uid: user.uid,

            });

        };
        //changeState(signinGoogle)
    });

    //Entramos a timeline
    let current = firebase.auth().currentUser; //fue okay
    
    if (current !== null) {
        window.location.hash = 'timeline';
        console.log(user.displayName);
        console.log(user);
    } else {
        console.log("No hay nadie logueado");
    } 
    
    //Changing page to signIn
    const signinFromSignup= document.querySelector('.signin-view');
    signinFromSignup.addEventListener('click',() => {
        window.location.hash = 'signin';
    });

};

