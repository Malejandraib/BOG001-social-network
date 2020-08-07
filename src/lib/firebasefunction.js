export {createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword, changeState};

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

/*---------- Creating and login user with google account ------------ */
async function registerGoogle (provider){
    try {
        const registerTemp = await firebase.auth().signInWithPopup(provider);
        return registerTemp;       
    }
    catch(error) {
        return error;
    };
};

/*-----------signInEmailAndPassword------------ */
async function signInEmailAndPassword(email,password){
    try{
        const signInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
        return signInUser;
    }
    catch(error) {
        var errorMessage = error.message;
/*         // Handle Errors here.
        var errorCode = error.code;
        console.log(error);
        console.log(error.code); */
        return errorMessage;
    };
};

/* -----------Cambio a timeline-----------  */

function changeState (){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.hash = 'timeline';
            console.log(user.displayName);
            console.log(user);
        } else {
            console.log("nope");
        }
    });
}
//async function authenticationState (user){
// firebase.auth().onAuthStateChanged(function(user){
//     if (user) {
//         console.log(user);
//         //Que vaya a timeline
//         btnLogOut.style.display = 'block';
//         console.log(btnLogOut);
//         const displayName = user.displayName;
//         console.log(displayName);
//         const email = user.email;
//         const emailVerified = user.emailVerified;
//         const photoURL = user.photoURL;
//     } else {
//         console.log("nope");
//     }; 
// }); 
/*     catch (error){
        console.log('no hay usuario')
        return error;
    }; */


/* --------- Logingout account ------------ */
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