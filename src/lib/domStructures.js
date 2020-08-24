export const postStructure = (doc, uid) => {
    //la idea es poder hacer esto más fácil

    const divPost = document.createElement('div');
    divPost.classList.add("div-post");

    const divPost1 = document.createElement('div');
    divPost1.classList.add("div-post1");
    const divPost2 = document.createElement('div');
    divPost2.classList.add("div-post2");
    const divPost3 = document.createElement('div');
    divPost3.classList.add("div-post3");
    const divPost4 = document.createElement('div');
    divPost4.classList.add("div-post4");

    //divPost es el grande, y se divide en 4.


    const userImg = document.createElement('img');
    userImg.src = doc.data().photo;
    userImg.classList.add("user-img");

    const pNombre = document.createElement('p');
    pNombre.textContent = doc.data().name;

    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = "Edit";
    buttonEdit.classList.add("edit-post");
    buttonEdit.dataset.idpost = doc.id;
    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = "Delete";
    buttonDelete.classList.add("delete-post");
    buttonDelete.dataset.idpost = doc.id;

    const pPost = document.createElement('p');
    pPost.textContent = doc.data().post;

    const likeButton = document.createElement('button');
    likeButton.classList.add("likes-button");
    likeButton.textContent = "🧡 Like";
    likeButton.dataset.idpost = doc.id;

    const likesNum = document.createElement('p');
    likesNum.textContent = doc.data().likes.length;

    const comment = document.createElement('textarea');
    comment.placeholder = "Write a comment here!";

    const sendComment = document.createElement('button');
    sendComment.textContent = "Send";

    //orden de los elementos
    divPost1.appendChild(userImg);
    divPost1.appendChild(pNombre);

    if (uid == doc.data().uid) {
        divPost1.appendChild(buttonEdit);
        divPost1.appendChild(buttonDelete);
    }

    divPost2.appendChild(pPost);
    
    divPost3.appendChild(likesNum);
    divPost3.appendChild(likeButton);
    
    divPost4.appendChild(comment);
    divPost4.appendChild(sendComment);

    divPost.appendChild(divPost1);
    divPost.appendChild(divPost2);
    divPost.appendChild(divPost3);
    divPost.appendChild(divPost4);

    

    return divPost;
}

