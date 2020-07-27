// Este es el punto de entrada de tu aplicacion

import { myFunction } from "./lib/index.js";

myFunction();

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector(".name-signup").value;
  const email = document.querySelector(".email-signup").value;
  const password = document.querySelector(".password-signup").value;
  //console.log(email, name);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  alert("Welcome, successfully registered user");
});

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
    // btnSignGoogle.setAttribute = ("id", "signin-google");
    btnSignGoogle.classList.add("signin-google");
    btnSignGoogle.classList.remove("btn-signup-google");
  } else {
    alreadyAccount.innerHTML = "Already have an account? <span>Sign In</span>";
    btnSign.textContent = "SIGN UP";
    btnSignGoogle.textContent = "REGISTER WITH GOOGLE";
    btnSignGoogle.classList.add("btn-signup-google");
    btnSignGoogle.classList.remove("signin-google");

    // btnSignGoogle.setAttribute = ("id", "register-google");
  }
});

const registerWithGoogle = document.querySelector(".btn-signup-google");
console.log(registerWithGoogle);
registerWithGoogle.addEventListener("click", googleRegister);

function googleRegister() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(provider);
      console.log(result);
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  if (errorCode === "auth/account-exists-with-different-credential") {
    alert(
      "You have already signed up with a different auth provider for that email."
    );
    // If you are using multiple auth providers on your app you should handle linking
    // the user's accounts here.
  } else {
    console.error(error);
  }
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}
