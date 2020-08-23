export const postStructure = (doc, uid) => {
    //la idea es poder hacer esto más fácil

    const divPost = document.createElement('div');
    
    const userImg = document.createElement('img');
    userImg.src = doc.data().photo;
    userImg.classList.add("user-img");

    const pNombre = document.createElement('p');
    pNombre.textContent = doc.data().name;
    
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = "Edit";
    buttonEdit.classList.add("edit-post");
    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = "Delete";

    const pPost = document.createElement('p');
    pPost.textContent = doc.data().post;
    
    const likes = document.createElement('p');
    likes.textContent = "20 Likes";

    const comment = document.createElement('textarea');

    const sendComment = document.createElement('button');
    sendComment.textContent = "Send";

    //orden de los elementos
    divPost.appendChild(userImg);
    divPost.appendChild(pNombre);

    if(uid == doc.data().uid){
        divPost.appendChild(buttonEdit);
        divPost.appendChild(buttonDelete);
    }

    divPost.appendChild(likes);
    divPost.appendChild(pPost);
    divPost.appendChild(comment);
    divPost.appendChild(sendComment);

    return divPost; 
}

