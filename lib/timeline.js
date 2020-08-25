import { gettingData, newPost, logOutAccount, gettingDataOrdered, editingPostDocument, deletingPostModal, updateLikes } from "./firebasefunction.js";
import { postStructure } from "./domStructures.js";

export default () => {

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
    gettingData('users', uid).then((doc) => {
        photoUser.src = doc.photoURL;
        nameTimeline.textContent = doc.name;
    });

    //Hacer un nuevo post
    formShare.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputPost = document.querySelector('.input-share').value;

        if (inputPost !== ' ') {
            gettingData('users', uid).then((doc) => {
                const postData = {
                    uid: uid,
                    post: inputPost,
                    name: doc.name,
                    photo: doc.photoURL,
                    date: firebase.firestore.Timestamp.now(),
                }

                newPost(postData);
            });
            formShare.reset();
        } else {
            alert('Please enter your post');
        }

    }); //termina nuevo post

    //OnSnapshot, aún no sabemos bien cómo usarlo
    db.collection("post").onSnapshot(function (doc) {

        const specificContainer = document.querySelector('.container-all-post');
        specificContainer.innerHTML = `<div class = "loader"></div>`;

        gettingDataOrdered('post', 'date', 'desc').then(function (doc) {

            specificContainer.innerHTML = "";
            doc.forEach(function (doc) {
                const postId = doc.id; //Id específico para cada post
                specificContainer.appendChild(postStructure(doc, uid));     //Aquí es donde se hace la estructura
            });

            //Aquí inicia editar
            const editingPost = document.querySelectorAll('.edit-post');

            editingPost.forEach(item => {
                item.addEventListener('click', (e) => {

                    const idPost = e.currentTarget.dataset.idpost;

                    //const openModal = () => {
                    const template = document.querySelector("#modal-edit");
                    var clon = template.content.cloneNode(true);
                    root.appendChild(clon);

                    //que aparezca previsualizado el post anterior
                    const modalContainer = document.getElementsByClassName("modal-container")[0];
                    modalContainer.style.display = "block";

                    const closeModal = document.querySelector('.close-modal');

                    gettingData('post', idPost).then((e) => {
                        let inputModal = document.querySelector('.input-share-modal');
                        console.log(e.post);
                        inputModal.value = e.post;
                        const formEditModal = document.querySelector('.form-edit-modal');

                        formEditModal.addEventListener('submit', (e) => {
                            e.preventDefault()
                            let inputModal = document.querySelector('.input-share-modal').value;
                            editingPostDocument(idPost, inputModal);
                            modalContainer.style.display = "none";
                        });
                    });

                    closeModal.addEventListener('click', () => {
                        modalContainer.style.display = "none";
                        root.removeChild(modalContainer);
                    });

                    modalContainer.addEventListener('click', () => {
                        if (event.target == modalContainer) {
                            modalContainer.style.display = "none";
                            root.removeChild(modalContainer);
                        }
                    });
                });
            });//Acá finaliza editar

            const deletePost = document.querySelectorAll('.delete-post');

            deletePost.forEach(item => {
                item.addEventListener('click', (e) => {
                    const idPost = e.currentTarget.dataset.idpost;

                    const template = document.querySelector("#modal-delete");
                    console.log(template);
                    var clon = template.content.cloneNode(true);
                    root.appendChild(clon);

                    const modalContainer = document.getElementsByClassName("modal-container-delete")[0];
                    console.log(modalContainer);
                    modalContainer.style.display = "block";

                    const closeModal = document.querySelector('.close-modal');

                    closeModal.addEventListener('click', () => {
                        root.removeChild(modalContainer);
                        modalContainer.style.display = "none";

                    });

                    modalContainer.addEventListener('click', () => {
                        if (event.target == modalContainer) {
                            modalContainer.style.display = "none";
                            root.removeChild(modalContainer);
                        }
                    });

                    const btnDelete = document.querySelector('.btn-delete');
                    btnDelete.addEventListener('click', () => {
                        deletingPostModal(idPost);
                        modalContainer.style.display = "none";
                        root.removeChild(modalContainer);
                    })

                })
            });//Acá termina borrar


            //Acá empiezan los likes
            const likeButton = document.querySelectorAll('.likes-button');

            likeButton.forEach(item => {
                item.addEventListener('click', (e) => {

                    
                    const idPost = e.currentTarget.dataset.idpost;

                    gettingData('post', idPost).then((e) => {
                        
                        if (e.likes.includes(uid)){
                            const index = e.likes.indexOf(uid)
                            console.log(e.likes.indexOf(uid))

                            const variable = e.likes.splice(index, 1);
                            console.log("Esta es la variable de splice: " + variable);
                            console.log(e.likes)
                            updateLikes(idPost, e.likes);

                        }else {
                            e.likes.push(uid);
                            console.log(uid);
                            
                            console.log("Aquí va el e.likes, debe ser un array: " + e.likes);
                            updateLikes(idPost, e.likes);
                        }
                    });
                });
            });
            //Acá terminan los likes


        }); //GettingDataDETimeline
    }); //Snapshot

    //
    //Para hacer logout
    btnLogOut.forEach(item => {
        item.addEventListener('click', () => {
            logOutAccount();
            window.location.hash = '';
        });
    });

    const menuProfile = document.querySelectorAll(".menu-profile");

    menuProfile.forEach(item => {
        item.addEventListener('click', () => {
        window.location.hash = 'profile';
        });
    });
}



// let likesCont = doc.likes.length;
// console.log(likesCont);

//Esto si sirve pero para otra cosa
// let likesCont = []; //nos va a traer la lista de todos los uid que si le dieron like
// likesCont.push(doc.likes);
// console.log(likesCont, likesCont.length);