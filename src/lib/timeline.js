import {gettingData, newPost, logOutAccount} from "./firebasefunction.js";
import {postStructure} from "./domStructures.js";


export default () =>{

    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const user = firebase.auth().currentUser;
    const uid = user.uid; 

    const photoUser = document.querySelector('.user-img');
    const nameTimeline = document.querySelector('.user-name');
    const btnLogOut = document.querySelectorAll('.logout');
    const formShare = document.querySelector('.form-share');    

    //Traer nombre y foto correctamente
    gettingData('users', uid).then((doc)=>{
        photoUser.src = doc.photoURL;
        nameTimeline.textContent = doc.name;
    });


    //Hacer un nuevo post
    formShare.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputPost = document.querySelector('.input-share').value;

        if(inputPost !== ' '){
            gettingData('users', uid).then((doc)=>{
                const postData = {
                    uid: uid,
                    post: inputPost,
                    name: doc.name,
                    photo: doc.photoURL,
                    date: firebase.firestore.Timestamp.now()
                }     
                newPost(postData);
            });
            formShare.reset();
        }else {
            alert('Please enter your post');
        }

    }); //termina nuevo post

    //OnSnapshot, aún no sabemos bien cómo usarlo
    db.collection("post")
    .onSnapshot(function(doc) {
        
        const specificContainer = document.querySelector('.container-all-post');
        specificContainer.innerHTML = `<div class = "loader"></div>`;

        db.collection("post").orderBy("date", "desc").get().then(function(doc){ 
            
            specificContainer.innerHTML = "";
            doc.forEach(function(doc){
            const postId = doc.id; //Id específico para cada post

            specificContainer.appendChild(postStructure(doc, uid));     //Aquí es donde se hace la estructura
        });
        
        const editingPost = document.querySelectorAll('.edit-post');

        editingPost.forEach(item => {
            item.addEventListener('click', ()=>{ 
                //const openModal = () => {
                    const template = document.querySelector("#modal-edit");
                    var clon = template.content.cloneNode(true);
                    root.appendChild(clon);

                    const modalContainer = document.getElementsByClassName("modal-container")[0];
                    modalContainer.style.display = "block";
               // }
            });
        });
    });
    });

    //Para hacer logout
    btnLogOut.forEach (item => {
        item.addEventListener('click', ()=>{
            logOutAccount();
            window.location.hash = '';
        });
    });
}




//     formShare.addEventListener('submit',(e)=>{
//         e.preventDefault();

//         const inputPost = document.querySelector('.input-share').value;
        
//         if(inputPost !== ' '){

//             let today = new Date();
//             let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//             let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//             let dateTime = date+' '+time;

//             let user = firebase.auth().currentUser;

//             const userGeneral = {
//                 uid: user.uid,
//                 name: user.displayName,
//                 photo: user.photoURL,
//                 inputPost: inputPost,
//                 date: dateTime  
//             }


//             newPost(userGeneral).then((docRef) =>{
//                 console.log(docRef);

//                 const specificCollectionId = docRef.ua.path.segments[1];
//                 console.log(specificCollectionId);

            
//                 gettingData2('post', docRef.id).then((doc)=>{

//                     console.log(doc);

                
    
//                     const containerBox = document.getElementsByClassName("recently-posted")[0];
//                     const divUser = document.createElement('div');
//                     const individualPost = document.createElement('div');
                    
//                     individualPost.classList.add("individual-post");
//                     divUser.classList.add("block-createpost__user");
//                     containerBox.appendChild(individualPost);
                    
//                     const photoShare = document.createElement('img');
//                     const nameShare = document.createElement('h4');
//                     nameShare.classList.add("user-name");
//                     const dateShare = document.createElement('h5');
//                     const postShare = document.createElement('p');
//                     postShare.classList.add("post-text");
    
//                     const deletePost = document.createElement('i');
//                     deletePost.classList.add("fa", "fa-trash");
//                     const buttonEdit = document.createElement('button');
//                     //buttonEdit.setAttribute("data-idcollection", specificCollectionId);
//                     buttonEdit.classList.add("fa", "fa-edit", "edit-button");
//                     buttonEdit.addEventListener('click', () => {openModal(specificCollectionId)});
                    
//                     photoShare.classList.add("user-img");
//                     photoShare.src = doc.photo;
//                     nameShare.textContent = doc.name;
//                     dateShare.textContent = doc.date;
//                     postShare.textContent = doc.post;

//                     divUser.appendChild(photoShare);
//                     divUser.appendChild(nameShare);
//                     divUser.appendChild(buttonEdit);
//                     divUser.appendChild(deletePost);
//                     individualPost.appendChild(divUser);  
//                     individualPost.appendChild(postShare);
//                     individualPost.appendChild(dateShare);
    
//                     const commentButton = document.createElement('textarea');
//                     const buttonPostContainer = document.createElement('div');
//                     buttonPostContainer.classList.add("button-post__container");
    
//                     commentButton.setAttribute("placeholder", "Comment here!");
//                     commentButton.classList.add("input-comment__style");

//                     buttonPostContainer.appendChild(commentButton);
//                     individualPost.appendChild(buttonPostContainer); 
                    
//                     const buttonSendPost = document.createElement('button');
//                     buttonSendPost.textContent = "Comment";
//                 });
//             });
//         }else {
//             return alert('please enter newpost')
//         }
        
//         formShare.reset();
//     });

//     db.collection("post").orderBy("date", "desc").get().then(function(querySnapshot) {

//             let containerBox = document.getElementsByClassName("container-post")[0];

//             querySnapshot.forEach(function(doc) {
//                console.log();
//                 let specificCollectionId = doc.ua.path.segments[6];
                
//                 const divUser = document.createElement('div');
//                 const individualPost = document.createElement('div');

//                 individualPost.classList.add("individual-post");
//                 divUser.classList.add("block-createpost__user");

//                 containerBox.appendChild(individualPost);

//                 const photoShare = document.createElement('img');
//                 const nameShare = document.createElement('p');
//                 nameShare.classList.add("user-name");
//                 const dateShare = document.createElement('h5');
//                 const postShare = document.createElement('p');

                

//                 photoShare.classList.add("user-img");
//                 photoShare.src = doc.data().photo; 
//                 nameShare.textContent = doc.data().name;
//                 dateShare.textContent = doc.data().date;
//                 postShare.textContent = doc.data().post;
//                 postShare.classList.add("post-text");
                
//                 divUser.appendChild(photoShare);
//                 divUser.appendChild(nameShare);
                
//                 if(uid == doc.data().uid){
//                     const deletePost = document.createElement('i');
//                     deletePost.classList.add("fa");
//                     deletePost.classList.add("fa-trash");
//                     // deletePost.textContent = "delete";
//                     const buttonEdit = document.createElement('button');
//                     //buttonEdit.setAttribute("data-idcollection", specificCollectionId);
//                     buttonEdit.classList.add("fa", "fa-edit", "edit-button");
                    
//                     divUser.appendChild(deletePost);
//                     divUser.appendChild(buttonEdit);

//                     buttonEdit.addEventListener('click', () => {openModal(specificCollectionId)});
//                     //deletePost.addEventListener('click', deletingPost);
//                 }

//                 individualPost.appendChild(divUser);          
//                 individualPost.appendChild(postShare);
//                 individualPost.appendChild(dateShare);
                
                
//                 const commentButton = document.createElement('textarea');
//                 const buttonPostContainer = document.createElement('div');
//                 buttonPostContainer.classList.add("button-post__container");
            
//                 commentButton.setAttribute("placeholder", "Comment here!");
//                 commentButton.classList.add("input-comment__style");
                
//                 buttonPostContainer.appendChild(commentButton);
//                 individualPost.appendChild(buttonPostContainer);               
//             });
//         });

//     btnLogOut.forEach (item => {
//         item.addEventListener('click', ()=>{
//             logOutAccount();
//             window.location.hash = '';
//         });
//     });
// };

// const openModal = (id) => {

//     console.log(id);

//     const template = document.querySelector("#modal-edit");
//     var clon = template.content.cloneNode(true);
//     root.appendChild(clon);

//     const modalContainer = document.getElementsByClassName("modal-container")[0];
//     modalContainer.style.display = "block";
//     const submitEdit = document.querySelector('#btn-edit');
    
    

//     //submitEdit.addEventListener('click', editingPost(id, updatePost));

//     submitEdit.addEventListener('click', (e) =>{
//         e.preventDefault()
//         const updatePost = document.querySelector('.input-share-modal').value;
//         console.log(updatePost);
//         editingPost(id, updatePost);
//     });

//     const closeModal = document.querySelector ('.close-modal');
//     closeModal.addEventListener('click', ()=>{
//         modalContainer.style.display = "none";
//         root.removeChild(modalContainer);
//     });
    
//     modalContainer.addEventListener('click', () => {
//         if (event.target == modalContainer) {
//             modalContainer.style.display = "none";
            
//         }
//     });
    
// }

// const editingPost = (referenceIdPost, updatePost) => {
    

//     console.log(referenceIdPost);
    
//         async function editingPostAFirebase(referenceIdPost,updatePost){
//             try{
//                 let editPost = await db.collection("post").doc(referenceIdPost); 
//                 const postEditado = editPost.update({
//                     post: updatePost
//                 });           
//                 console.log("Document successfully updated!");
//                 return postEditado
//             }
//             catch(error){
//             console.error("Error updating document: ", error);
//             };
//         };
        
//         editingPostAFirebase(referenceIdPost, updatePost);   
// }

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