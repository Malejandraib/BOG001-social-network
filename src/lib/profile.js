import { gettingData} from "./firebasefunction.js";

export default () => {
    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const menuTimeline = document.querySelectorAll(".menu-timeline");

    const container = document.querySelector(".container-all-post");
    container.textContent = "Profile option Under construction :D, have a nice day!";

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    const photoUser = document.querySelector('.user-img');
    const nameTimeline = document.querySelector('.user-name');
    const formShare = document.querySelector('.form-share');

    //Traer nombre y foto correctamente
    gettingData('users', uid).then((doc) => {
        photoUser.src = doc.photoURL;
        nameTimeline.textContent = doc.name;
    });

    menuTimeline.forEach(item => {
        item.addEventListener('click', () => {
        window.location.hash = 'timeline';
        });
    });
}