import {createUserEmailAndPassword, registerGoogle,logOutAccount} from "./firebasefunction.js"

const botoncito = document.querySelector(".signin-view");
console.log(botoncito);

console.log(window.location.hash);


export default () => {
  const divElement = createElement('div');
  divElement.innerHTML = view;

/*   const btnClick = divElement.querySelector('#btnClick');
  btnClick.addEventListener('click', () => {
    alert('clicked'); 
  });*/

  return divElement;
}

/* SIGNUP */
//Variables de formulario signup y verificacion de contraseña
const signupForm = document.querySelector('#signup-form');
const passwordValidation = document.querySelector('.password-signup');
const msjEmailVer = document.querySelector('#verification-email');
const msjVerification= document.querySelector('#verification-password');

/* const signup (){
  const signingUp = document.querySelector('#signup')
} */


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
}

//Enviar formulario con email y password, para crear nuevo usuario 
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  /* const name = document.querySelector(".name-signup").value; */
    const email = document.querySelector(".email-signup").value;
    const password = document.querySelector(".password-signup").value;
    createUserEmailAndPassword( email,password, msjEmailVer);
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

//************************************************* */
//Cambio a timeline 
    
/* firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    //Que vaya a timeline
    btnLogOut.style.display = 'block';
    console.log(btnLogOut);
    const displayName = user.displayName;
    console.log(displayName);
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
  } else {
    console.log("nope");
  }
});  */

//LogOut
let btnLogOut = document.querySelector(".btn-log-out");
btnLogOut.style.display = 'none';
btnLogOut.addEventListener("click", logOut);

function logOut(){
  logOutAccount();
  //Faltan los botones 
}

function emailSignIn(){

  let email = document.querySelector(".email-signup").value;
  let password = document.querySelector(".password-signup").value;
  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    console.log("entre wiii");
  //acceso aquiiiiii
  // [END_EXCLUDE]
  });
  // [END authwithemail]
}
