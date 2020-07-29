// Este es el punto de entrada de tu aplicacion
import { myFunction } from "./lib/index.js";
myFunction();

//Variables verificacion de contraseña
let passwordValidation = document.querySelector('.password-signup');
let msjVerification= document.querySelector('#verification-password');
//Variables verificacion de email
const signupForm = document.querySelector('#signup-form');
const msjEmailVer = document.querySelector('#verification-email');

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

//Enviar formulario
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector(".name-signup").value;
  const email = document.querySelector(".email-signup").value;
  const password = document.querySelector(".password-signup").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
    let errorCode = error.code; //Nos muestra el tipo de error así: auth/email-already-in-use
    let errorMessage = error.message; //Error message nos muestra una string los errores que no permiten la autenticación: email en uso o contraseña no válida
    console.log(errorMessage); 
    if (errorCode == "auth/weak-password") {
      alert("The password is too weak.");
    } else {
      msjEmailVer.textContent = errorMessage;
      //alert("Welcome, successfully registered user");
    }
    console.log(error);
  });
});

//Cambiar vista de registro a inicio de sesión y viceversa
const alreadyAccount = document.getElementById("alreadyAccount");
const containerName = document.querySelector(".inputName");
const btnSign = document.querySelector(".btn-signup"); 
const btnSignGoogle = document.querySelector(".btn-signup-google");
alreadyAccount.addEventListener("click", function (e) {
  containerName.classList.toggle("hide");

  if (containerName.className == "inputName hide") {
    alreadyAccount.innerHTML = "Don’t have an account? <span>Sign Up<span>";
    btnSign.textContent = "SIGN IN";
    btnSignGoogle.textContent = "SIGN IN WITH GOOGLE";
    btnSignGoogle.classList.add("signin-google");
    btnSignGoogle.classList.remove("btn-signup-google");
  } else {
    alreadyAccount.innerHTML = "Already have an account? <span>Sign In</span>";
    btnSign.textContent = "SIGN UP";
    btnSignGoogle.textContent = `REGISTER WITH GOOGLE`;
    btnSignGoogle.classList.add("btn-signup-google");
    btnSignGoogle.classList.remove("signin-google");

  }

  
});

//signup with google and login 
const registerWithGoogle = document.querySelector(".btn-signup-google");
console.log(registerWithGoogle);
registerWithGoogle.addEventListener("click", googleRegister);

function googleRegister() {
  //aqui va el change al otro html
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    let user = result.user;
    console.log(user);
    console.log(token);
  })
  .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    console.log(credential);
  });
  }


//Cambio a timeline 
    
firebase.auth().onAuthStateChanged(function(user) {
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
});

//LogOut
let btnLogOut = document.querySelector(".btn-log-out");
btnLogOut.style.display = 'none';
btnLogOut.addEventListener("click", logOut);

function logOut(){
  firebase.auth().signOut().then(function() {
    console.log("// Sign-out successful.");
  }).catch(function(error) {
    // An error happened.
  });
}


// const signInForm = document.querySelector("#login-form");

// signInForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = signInForm["login-email"].value;
//   const password = signInForm["login-password"].value;

//   // Authenticate the User
//   auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
//     // clear the form
//     signInForm.reset();
//     // close the modal
//     $("#signinModal").modal("hide");
//   });
// });