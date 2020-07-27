// Este es el punto de entrada de tu aplicacion

import { myFunction } from "./lib/index.js";

myFunction();

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector(".inputName").value;
  const email = document.querySelector(".email-signup").value;
  const password = document.querySelector(".password-signup").value;
  console.log(email, name);
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

function toggleRegisterLogin() {}

const alreadyAccount = document.getElementById("alreadyAccount");
const containerName = document.querySelector(".inputName");
const btnSign = document.querySelector(".btn-signup");
const btnSignGoogle = document.querySelector(".btn-signup-google");
alreadyAccount.addEventListener("click", function (e) {
  console.log(containerName.className);
  containerName.classList.toggle("hide");12566t5rfyggggggggggggggggggggg
  if (containerName.className == "inputName hide") {
    alreadyAccount.textContent = "Don’t have an account? Sign Up";
    btnSign.textContent = "SIGN IN";
    btnSignGoogle.textContent = "SIGN IN WITH GOOGLE";
  } else {
    alreadyAccount.textContent = "Already have an account? Sign In";
    btnSign.textContent = "SIGN UP";
    btnSignGoogle.textContent = "REGISTER WITH GOOGLE";
  }

  console.log("hola");
});
