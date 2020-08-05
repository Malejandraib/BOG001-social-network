export { createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword };

/*----- Creating user with email and password ----- */
async function createUserEmailAndPassword(email,password){
    try{
        const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log("registrandose...");
        return authentication;
    }
    catch(error) {
        // Handle Errors here.
        console.log(error);
        let errorCode = error.code; //Nos muestra el tipo de error así: auth/email-already-in-use
        let errorMessage = error.message; //Error message nos muestra una string los errores que no permiten la autenticación: email en uso o contraseña no válida
        if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
        } else {
        console.log(errorMessage);
        }
        return error;
        console.log(error)
    };
};

/*----- Creating and login user with google account //try catch - quitar then ----- */
async function registerGoogle (provider){
    try {
        const registerTemp = await firebase.auth().signInWithPopup(provider);
        let token = result.credential.accessToken;
        let user = result.user;
        let idcredential = result.credential.idToken;
        let additional = result.additionalUserInfo.isNewUser;
        console.log("Es un nuevo usuario?:" + additional);
        return registerTemp;       
    }
    catch(error) {
        console.log(error.code, error.credential);
        return error
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
        console.log(signInUser);
    }
    catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // return error
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
