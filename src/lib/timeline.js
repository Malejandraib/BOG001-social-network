import {logOutAccount, gettingData, gettingData2} from "./firebasefunction.js";


export default () =>{

    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const photoUser = document.querySelector('.user-img');
    const nameTimeline = document.querySelector('.user-name');
    const btnLogOut = document.querySelectorAll('.logout');
    const formShare = document.querySelector('.form-share');    

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    let name  = user.displayName;
    let photo = user.photoURL;

    gettingData(uid).then((doc)=>{
        nameTimeline.textContent = doc.name;
        photoUser.src = doc.photoURL;
    });

    formShare.addEventListener('submit',(e)=>{
        e.preventDefault();

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        
        const inputPost = document.querySelector('.input-share').value;
       

        async function newPost (){
            try{
                const creatingPost = await db.collection("post").add({
                    uid: uid,
                    post: inputPost,
                    likesCounter: 0, //likedby.lenght
                    name: name,
                    photo: photo,
                    likedBy: 0,
                    date: dateTime             
                })
               
                return creatingPost
            }
            catch(error){
                return error.message
            }
        };
        
        newPost().then((docRef) =>{
            
            gettingData2('post', docRef.id).then((doc)=>{

                const containerBox = document.getElementsByClassName("recently-posted")[0];

                const divUser = document.createElement('div');
                divUser.classList.add("block-createpost__user");
                containerBox.appendChild(divUser);

                const photoShare = document.createElement('img');
                const nameShare = document.createElement('h3');
                const dateShare = document.createElement('p');
                const postShare = document.createElement('p');

                const deletePost = document.createElement('i');
                deletePost.classList.add("fa");
                deletePost.classList.add("fa-thrash");
                const editPost = document.createElement('i');
                editPost.classList.add("fa");
                editPost.classList.add("fa-edit");
                editPost.addEventListener('click', editingPost);
                
                divUser.appendChild(editPost);
                divUser.appendChild(deletePost);
                
                
                photoShare.classList.add("user-img");
                photoShare.src = doc.photo;
                nameShare.textContent = doc.name;
                dateShare.textContent = doc.date;
                postShare.textContent = doc.post;

                divUser.appendChild(photoShare);
                divUser.appendChild(nameShare);
                containerBox.appendChild(dateShare);
                containerBox.appendChild(postShare);
            });
        });

        formShare.reset();
    });


    db.collection("post").orderBy("date", "desc").get().then(function(querySnapshot) {

            let containerBox = document.getElementsByClassName("container-post")[0];
            querySnapshot.forEach(function(doc) {

                

                if(uid == doc.data().uid){
                    const deletePost = document.createElement('i');
                    deletePost.classList.add("fa");
                    deletePost.classList.add("fa-trash");
                    const editPost = document.createElement('i');
                    editPost.classList.add("fa");
                    editPost.classList.add("fa-edit");
                    editPost.textContent = "edit";
                    editPost.classList.add("edit-button");
                    containerBox.appendChild(deletePost);
                    containerBox.appendChild(editPost);

                    editPost.addEventListener('click', editingPost);
                }

                const photoShare = document.createElement('img');
                const nameShare = document.createElement('h2');
                const dateShare = document.createElement('p');
                const postShare = document.createElement('p');
                
                photoShare.classList.add("user-img");
                photoShare.src = doc.data().photo; 
                nameShare.textContent = doc.data().name;
                dateShare.textContent = doc.data().date;
                postShare.textContent = doc.data().post;
                
                containerBox.appendChild(photoShare);
                containerBox.appendChild(nameShare);
                containerBox.appendChild(dateShare);
                containerBox.appendChild(postShare);

                
            });
    });
    
    /* const edit = document.querySelector('.edit.button');
    console.log(edit);
    edit.addEventListener('click', ()=>{
        alert ('Aqui debe ir el modal');
    }) */

    //Función de solo DOM

    


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
        });
    });
};



const editingPost = () => {
    const template = document.querySelector("#modal-edit");
    var clon = template.content.cloneNode(true);
    console.log(root);
    root.appendChild(clon);

    const modalContainer = document.getElementsByClassName("modal-container")[0];
    console.log(modalContainer);
    modalContainer.style.display = "block";

    const closeModal = document.querySelector ('.close-modal');

    closeModal.addEventListener('click', ()=>{
        modalContainer.style.display = "none";
    });
    
    modalContainer.addEventListener('click', () => {
        if (event.target == modalContainer) {
            modalContainer.style.display = "none";
        }
    });
    


}

/* window.onclick = function(event) {
    if (event.target == modalContainer) {
        modalContaine.style.display = "none";
    }
} */


/*var washingtonRef = db.collection("cities").doc("DC");

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    capital: true
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
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