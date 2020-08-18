import {logOutAccount, gettingData, gettingData2, newPost} from "./firebasefunction.js";


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

        const inputPost = document.querySelector('.input-share').value;
        
        if(inputPost !== ' '){

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            let user = firebase.auth().currentUser;

            const userGeneral = {
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                inputPost: inputPost,
                date: dateTime  
            }
            newPost(userGeneral).then((docRef) =>{
                console.log(docRef.ua.path.segments[1]);
                const specificCollectionId = docRef.ua.path.segments[1];
            
                gettingData2('post', docRef.id).then((doc)=>{

                    console.log(doc);
                    //console.log(doc.ua.path.segments[6]);
    
                    const containerBox = document.getElementsByClassName("recently-posted")[0];
    
                    const divUser = document.createElement('div');
                    const individualPost = document.createElement('div');
                    
                    
                    
                    individualPost.classList.add("individual-post");
                    divUser.classList.add("block-createpost__user");
                    containerBox.appendChild(individualPost);
                    
                    const photoShare = document.createElement('img');
                    const nameShare = document.createElement('h4');
                    nameShare.classList.add("user-name");
                    const dateShare = document.createElement('h5');
                    const postShare = document.createElement('p');
                    postShare.classList.add("post-text");
    
                    const deletePost = document.createElement('i');
                    deletePost.classList.add("fa", "fa-trash");
                    const buttonEdit = document.createElement('button');
                    buttonEdit.setAttribute("data-idcollection", specificCollectionId);
                    buttonEdit.classList.add("fa", "fa-edit", "edit-button");
                    buttonEdit.addEventListener('click', editingPost);
                    
                    photoShare.classList.add("user-img");
                    photoShare.src = doc.photo;
                    nameShare.textContent = doc.name;
                    dateShare.textContent = doc.date;
                    postShare.textContent = doc.post;

                    divUser.appendChild(photoShare);
                    divUser.appendChild(nameShare);
                    divUser.appendChild(buttonEdit);
                    divUser.appendChild(deletePost);
                    individualPost.appendChild(divUser);  
                    individualPost.appendChild(postShare);
                    individualPost.appendChild(dateShare);
    
                    const commentButton = document.createElement('textarea');
                    const buttonPostContainer = document.createElement('div');
                    buttonPostContainer.classList.add("button-post__container");
    
                    commentButton.setAttribute("placeholder", "Comment here!");
                    commentButton.classList.add("input-comment__style");

                    buttonPostContainer.appendChild(commentButton);
                    individualPost.appendChild(buttonPostContainer); 
                    
                    const buttonSendPost = document.createElement('button');
                    buttonSendPost.textContent = "Comment";
                });
            });
        }else {
            return alert('please enter newpost')
        }
        
        formShare.reset();
    });

    // setTimeout(function() {
    //     location.reload();
    //   }, 30000);

    db.collection("post").orderBy("date", "desc").get().then(function(querySnapshot) {



            let containerBox = document.getElementsByClassName("container-post")[0];

            querySnapshot.forEach(function(doc) {
               // console.log();
                let specificCollectionId = doc.ua.path.segments[6];
                
                const divUser = document.createElement('div');
                const individualPost = document.createElement('div');

                individualPost.classList.add("individual-post");
                divUser.classList.add("block-createpost__user");

                containerBox.appendChild(individualPost);

                const photoShare = document.createElement('img');
                const nameShare = document.createElement('p');
                nameShare.classList.add("user-name");
                const dateShare = document.createElement('h5');
                const postShare = document.createElement('p');

                

                photoShare.classList.add("user-img");
                photoShare.src = doc.data().photo; 
                nameShare.textContent = doc.data().name;
                dateShare.textContent = doc.data().date;
                postShare.textContent = doc.data().post;
                postShare.classList.add("post-text");
                
                divUser.appendChild(photoShare);
                divUser.appendChild(nameShare);
                
                if(uid == doc.data().uid){
                    const deletePost = document.createElement('i');
                    deletePost.classList.add("fa");
                    deletePost.classList.add("fa-trash");
                    // deletePost.textContent = "delete";
                    const buttonEdit = document.createElement('button');
                    buttonEdit.setAttribute("data-idcollection", specificCollectionId);
                    buttonEdit.classList.add("fa", "fa-edit", "edit-button");
                    
                    divUser.appendChild(deletePost);
                    divUser.appendChild(buttonEdit);

                    buttonEdit.addEventListener('click', editingPost); //Open Modal
                    //deletePost.addEventListener('click', deletingPost);
                }

                individualPost.appendChild(divUser);          
                individualPost.appendChild(postShare);
                individualPost.appendChild(dateShare);
                
                
                const commentButton = document.createElement('textarea');
                const buttonPostContainer = document.createElement('div');
                buttonPostContainer.classList.add("button-post__container");
            
                commentButton.setAttribute("placeholder", "Comment here!");
                commentButton.classList.add("input-comment__style");
                
                buttonPostContainer.appendChild(commentButton);
                individualPost.appendChild(buttonPostContainer);

                
            });
        });


    btnLogOut.forEach (item => {
        item.addEventListener('click', ()=>{
            logOutAccount();
            window.location.hash = '';
        });
    });
};


//Puede ir a otro .js
const editingPost = () => {
    let referenceIdPost = event.target;
    let referenceIdPost2 = event.currentTarget.dataset.idcollection;
    console.log(referenceIdPost);
    console.log(referenceIdPost2);
    
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

    const submitEdit = document.querySelector('.btn-modal__style')
    submitEdit.addEventListener('submit', (e)=>{
        e.preventDefault()
        


        /*var editPost = db.collection("post").doc("referenceIdPost");

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
    })

}

// const deletingPost = () => {
//     const template = document.querySelector("#modal-delete");
//     var clon = template.content.cloneNode(true);
//     console.log(root);
//     root.appendChild(clon);

//     const modalContainerDelete = document.getElementsByClassName("modal-delete-container")[0];
//     console.log(modalContainerDelete);
//     modalContainerDelete.style.display = "block";

//     const closeModal = document.querySelectorAll('.close-modal');

//     closeModal.forEach(function(e){
//         e.addEventListener('click', ()=>{
//             modalContainerDelete.style.display = "none";
//         });
//     });
    
//     modalContainerDelete.addEventListener('click', () => {
//         if (event.target == modalContainerDelete) {
//             modalContainerDelete.style.display = "none";
//         }
//     });
// }

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







/* const likeCommentContainer = document.createElement('div');
                likeCommentContainer.classList.add("lc-container");

                const commentsText = document.createElement('p');
                const commentsNumber = document.createElement('span');
                commentsNumber.textContent = "See All Comments";
                commentsText.classList.add("lc-text__style", "fa", "fa-comment");
                commentsText.appendChild(commentsNumber);
                
                const likesText = document.createElement('p');
                const likesButton = document.createElement ('button');
                const likes = document.createElement('div');
        
                likesText.textContent = "2";
                likesButton.textContent = 'like';
                likesButton.classList.add("fa", "fa-heart", "lc-text__style");
                likes.appendChild(likesText);
                likesButton.appendChild(likes);

                
                likeCommentContainer.appendChild(commentsText);
                likeCommentContainer.appendChild(likes);
                individualPost.appendChild(likes);
                individualPost.appendChild(likeCommentContainer);
                 */