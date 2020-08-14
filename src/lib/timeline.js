import {logOutAccount} from "./firebasefunction.js";
// import {changeState} from "./firebasefunction.js";


/* db.collection("instruments").doc('orquesta').set({
    name: "Violin",
    state: "CA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
 */

//quiero intentar update
var washingtonRef = db.collection("instruments").doc("orquesta");
console.log(washingtonRef);


var docRef = db.collection("instruments").doc("orquesta");
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// Set the "capital" field of the city 'DC'
// return washingtonRef.update({
//     name: "guitarra"
// })
// .then(function() {
//     console.log("Document successfully updated!");
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });

//Podría existir como en el boton de share y en signup para crear la coleccion de usarios 
/* db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
}); */






export default () =>{

    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    // console.log(changeState);

    // if (changeState === null){
    //     console.log(changeState)
    //     window.location.hash = 'notfound';
    // }else{
    //     window.location.hash = 'timeline';
    // }

    const btnLogOut = document.querySelectorAll('.logout');
    
    btnLogOut.forEach (item => {
        item.addEventListener('click', ()=>{
            logOutAccount();
            window.location.hash = '';
            console.log(logOutAccount());
        });
    });
};