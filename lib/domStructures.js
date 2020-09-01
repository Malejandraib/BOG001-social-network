/* eslint-disable */
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
    buttonEdit.classList.add("edit-post");
    /* const iconEdit = document.createElement('i');
    iconEdit.classList.add("far", "fa-edit"); */
    buttonEdit.textContent = "📝";
    //buttonEdit.appendChild(iconEdit)
    buttonEdit.dataset.idpost = doc.id;
    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = "🗑️";
    buttonDelete.classList.add("delete-post");
    buttonDelete.dataset.idpost = doc.id;

    /*     const datePost = document.querySelector('p');
        datePost.textContent = doc.data().date; */

    const pPost = document.createElement('p');
    pPost.textContent = doc.data().post;



    const likeButton = document.createElement('button');
    likeButton.classList.add("likes-button");
    likeButton.textContent = "🤍";
    likeButton.dataset.idpost = doc.id;

    const likesNum = document.createElement('p');
    likesNum.textContent = doc.data().likes.length;

    if (doc.data().likes.length == 0) {
        likesNum.textContent = "";
    }



    if (doc.data().likes.includes(uid)) {
        //likeButton.style.backgroundColor ='#e68757e5'

        likeButton.textContent = "🧡";
    }

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

export const eventStructure = (doc, uid) => {
    const divPost = document.createElement('div');
    divPost.classList.add("div-event");

    const divPost1 = document.createElement('div');
    divPost1.classList.add("div-post1");

    const divPost2 = document.createElement('div');
    divPost2.classList.add("div-post2");

    const divPost3 = document.createElement('div');
    divPost3.classList.add("div-post3");

    const divPost4 = document.createElement('div');
    divPost4.classList.add("div-post4");

    const divPost5 = document.createElement('div');
    divPost5.classList.add("div-post5");

    const info = document.createElement('div');
    info.classList.add("info");

    const userImg = document.createElement('img');
    userImg.src = doc.data().photo;
    userImg.classList.add("user-img");

    const pNombre = document.createElement('p');
    pNombre.textContent = doc.data().name;

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add("edit-post");

    buttonEdit.textContent = "📝";
    buttonEdit.dataset.idpost = doc.id;

    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = "🗑️";
    buttonDelete.classList.add("delete-post");
    buttonDelete.dataset.idpost = doc.id;

    const pEvent = document.createElement('p');
    pEvent.textContent = '🎉 Event: ' + doc.data().event;

    const pDate = document.createElement('p');
    pDate.textContent = '📅  Date:  ' + doc.data().date;

    const pPlace = document.createElement('p');
    pPlace.textContent = '🎤  Place:  ' + doc.data().place;

    const pCity = document.createElement('p');
    pCity.textContent = '🌇  City: ' + doc.data().city;

    const pHour = document.createElement('p');
    pHour.textContent = '🕓  Hour:  ' + doc.data().hour;

    const likeButton = document.createElement('button');
    likeButton.classList.add("likes-button");
    likeButton.textContent = "🤍";
    likeButton.dataset.idpost = doc.id;

    const likesNum = document.createElement('p');
    likesNum.textContent = doc.data().likes.length;

    if (doc.data().likes.length == 0) {
        likesNum.textContent = "";
    }

    if (doc.data().likes.includes(uid)) {
        likeButton.textContent = "🧡";
    }


    divPost1.appendChild(userImg);
    divPost1.appendChild(pNombre);
    if (uid == doc.data().uid) {
        divPost1.appendChild(buttonEdit);
        divPost1.appendChild(buttonDelete);
    }

    divPost2.appendChild(pEvent);

    divPost5.appendChild(pCity);
    divPost5.appendChild(pPlace);

    divPost4.appendChild(pDate);
    divPost4.appendChild(pHour);

    info.appendChild(divPost5)
    info.appendChild(divPost4)

    divPost3.appendChild(likesNum);
    divPost3.appendChild(likeButton);

    divPost.appendChild(divPost1);
    divPost.appendChild(divPost2);
    divPost.appendChild(info);
    divPost.appendChild(divPost3);

    return divPost;
}

