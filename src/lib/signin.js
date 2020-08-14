import {signInEmailAndPassword, registerGoogle} from "./firebasefunction.js";

export default () =>{
    const template = document.querySelector("#template-signin");
    var clon = template.content.cloneNode(true);
    root.appendChild(clon);
    
    //const formSignIn = document.querySelector('.form-signin');
    const btnSignIn = document.querySelector ('.btn-signup');
    const registerWithGoogle = document.querySelector('.btn-signin-google');
    const msjVerification = document.querySelector('#verification-password');
    const signinFromSignup= document.querySelector('.signup-view');

    btnSignIn.addEventListener('click', async (e) => {
        e.preventDefault()
        const email = document.querySelector(".email-signin").value;
        const password = document.querySelector(".password-signin").value;
        const signIn = await signInEmailAndPassword(email,password);
        window.location.hash = 'timeline';
        msjVerification.innerHTML = signIn;
    });

    //SignIn with google 
    registerWithGoogle.addEventListener("click", async (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        const signinGoogle = await registerGoogle(provider);
    });

    //Changing page to signUp
    signinFromSignup.addEventListener('click', () => {
        window.location.hash = '';
        console.log(signinFromSignup);
    });

    //Entramos en timeline
    let current = firebase.auth().currentUser;
    if (current !== null) {
        window.location.hash = 'timeline';
        console.log(current.displayName);
        console.log(current);
    } else {
        console.log("nope");
    } 

/*     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.hash = 'timeline';
            console.log(user.displayName);
            console.log(user);
        } else {
            console.log("nope");
        } 
    });*/

}