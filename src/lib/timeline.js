import {logOutAccount, gettingData, gettingData2,newPost} from "./firebasefunction.js";


export default () =>{

    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const photoUser = document.querySelector('.user-img');
    const nameTimeline = document.querySelector('.user-name');
    const btnLogOut = document.querySelectorAll('.logout');
    const btnShare = document.querySelector('.btn_share');
    let share = document.querySelector('.post');


    var user = firebase.auth().currentUser;
    console.log(user);
    var uid = user.uid;
    console.log(uid);
    
    gettingData(uid).then((doc)=>{
        nameTimeline.textContent = doc.name;
        photoUser.src = doc.photoURL;
    });

    btnShare.addEventListener('click',(e)=>{
        const inputPost = document.querySelector('.input-share').value;

        newPost().then((docRef) =>{
            console.log(docRef);
            gettingData2('post', docRef.id).then((doc)=>{
                share.textContent = doc.post;
                console.log(doc.post);
                console.log(share.textContent);
            });
        });

    });



        // db.collection("post").add({
        //     uid: uid,
        //     post:inputPost,
        //     likesCounter: 0
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        //     gettingData2("post", docRef.id).then((doc)=>{
        //         share.textContent = doc.post;
        //         console.log(doc.post);
        //         console.log(share.textContent);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });

    btnLogOut.forEach (item => {
        item.addEventListener('click', ()=>{
            logOutAccount();
            window.location.hash = '';
            console.log(logOutAccount());
        });
    });
};






/*var washingtonRef = db.collection("instruments").doc("orquesta");
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
}); */

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
/* db.collection("post").add({
    uid: uid,
    post: document.querySelector('')
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
}); */