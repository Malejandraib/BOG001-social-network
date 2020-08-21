export {createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword,gettingData, newPost};

/*----- Creating user with email and password ----- */
async function createUserEmailAndPassword(email,password){
    try{
        const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return authentication; //objeto que trae mucas cosas 
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
        return errorMessage;
    };
};

/*-----------gettingData------------ */
async function gettingData(collection, uid) {
    try{
        const dataUser = await db.collection(collection).doc(uid).get();
        return dataUser.data()
    }
    catch(error){
    return error.message
    };
};

/*-----------newPost------------ */
async function newPost(userGeneral){ 
                
    try{
        const creatingPost = await db.collection("post").add({
            uid: userGeneral.uid,
            post: userGeneral.post, //Es que acá había puesto dizque inputPost y era solo post
            name: userGeneral.name,
            photo: userGeneral.photo,  
            date: userGeneral.date           
        });
        return creatingPost
    }
    catch(error){
        
        return error.message
    }
};



/* -----------Cambio a timeline-----------  */

/* function changeState (){
    firebase.auth().onAuthStateChanged(async function(user) {
        try {
            const newUser= await user 
            window.location.hash = 'timeline';
            console.log(newUser.displayName);
            console.log(newUser);
            return newUser
            }
        catch (error) {
            window.location.hash = 'notfound';
            return error
        }
    });
    //return user;
}; */

// function changeState (){
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             console.log(user.displayName);
//         } else {
//             console.log("nope");
//         }

//         return user;
//     });  
// }

/* --------- Logingout account ------------ */
async function logOutAccount(){
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