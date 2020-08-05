export { createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword };

/*----- Creating user with email and password ----- */
async function createUserEmailAndPassword(email,password){
    try{
        const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return authentication;
    }
    catch(error) {
        let errorMessage = error.message; //Error message nos muestra una string los errores que no permiten la autenticación: email en uso o contraseña no válida
        return errorMessage;
    };
};

/*----- Creating and login user with google account //try catch - quitar then ----- */
async function registerGoogle (provider){
    try {
        const registerTemp = await firebase.auth().signInWithPopup(provider);
        return registerTemp;       
    }
    catch(error) {
        return error;
    };
};


/* ---Logingout account --- */
function logOutAccount(){
    var user = firebase.auth().currentUser;
    console.log(user);

    try {
        const signoutUser = firebase.auth().signOut()
        console.log("// Sign-out successful.");
        return signoutUser
        }
        catch(error) {
            // An error happened.
            return error
        };
};

/* ---signInEmailAndPassword--- */
async function signInEmailAndPassword(email,password){
    try{
        const signInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
        return signInUser;
    }
    catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
/*         if (errorCode === 'auth/wrong-password') {
            msjVerification.textContent = 'Wrong Password';
        } else {
            msjVerification.innerHTML = errorMessage;
        }
        console.log(error); */

        console.log(error);
        console.log(error.code);

        return errorCode;
    };
};




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
