export { createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword };

/*----- Creating user with email and password ----- */
async function createUserEmailAndPassword(email,password){
    try{
        const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(authentication);
        return authentication;
    }
    catch(error) {
        // Handle Errors here.
        let errorCode = error.code; //Nos muestra el tipo de error así: auth/email-already-in-use
        let errorMessage = error.message; //Error message nos muestra una string los errores que no permiten la autenticación: email en uso o contraseña no válida
        if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
        } else {
        //alert("Welcome, successfully registered user");
        }
        return error
    };
};

console.log(createUserEmailAndPassword());

/*----- Creating and login user with google account ----- */
async function registerGoogle (provider){
    const registerTemp = firebase.auth().signInWithPopup(provider);
    console.log(registerTemp);
    registerTemp.then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        var user = result.user;
        var idcredential = result.credential.idToken;
        var additional = result.additionalUserInfo.isNewUser;
        console.log(token);
        console.log("Es un nuevo usuario?:" + additional);
        console.log(result);
        return result       
    }).catch(function(error) {
        console.log(error.code, error.credential);
        // Handle error fromm GOOGLE IN ITSELF not us
        console.log(error)
        return error
    });
}

console.log(registerGoogle());

/* ---Logingout account --- */
function logOutAccount(){
    var user = firebase.auth().currentUser;
    console.log(user);

    firebase.auth().signOut().then(function() {
        console.log("// Sign-out successful.");
    }).catch(function(error) {
        // An error happened.
    });
};


//Así está en firebase
function signInEmailAndPassword(email, password){
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

console.log("Hola, no funciono.")
}




/* ---signInEmailAndPassword--- */
// async function signInEmailAndPassword(email,password){
//     try{
//         const signInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
//         console.log(signInUser);
//         // return signInUser;
//     }
//     catch(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         // if (errorCode === 'auth/wrong-password') {
//         //     alert('Wrong password.');
//         // } else {
//         //     alert(errorMessage);
//         // }
//         console.log(error);
//         console.log("entre wiii");
//         // return error
//     };
// };

console.log(signInEmailAndPassword());


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

/* //LogOut
let btnLogOut = document.querySelector(".btn-log-out");
btnLogOut.style.display = 'none';
btnLogOut.addEventListener("click", logOut);

function logOut(){
  logOutAccount();
  //Faltan los botones 
} */
