
/*----- Creating user with email and password ----- */
async function createUserEmailAndPassword (email,password){
    try{
        const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return authentication
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

console.log(createUserEmailAndPassword);

/*----- Creating and login user with google account ----- */
function registerGoogle (provider){
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        var user = result.user;
        var idcredential = result.credential.idToken;
        var additional = result.additionalUserInfo.isNewUser;
        console.log(token);
        console.log("Es un nuevo usuario?:" + additional );
        console.log(result); //isnewUser: False
    }).catch(function(error) {
        console.log(error.code, error.credential);
        // Handle error fromm GOOGLE IN ITSELF not us  
    });
}

/* ---Logingout account --- */
function logOutAccount(){
    var user = firebase.auth().currentUser;
    console.log(user);

    firebase.auth().signOut().then(function() {
        console.log("// Sign-out successful.");
    }).catch(function(error) {
        // An error happened.
    });
}



export { createUserEmailAndPassword, registerGoogle, logOutAccount };