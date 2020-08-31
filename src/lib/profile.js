/* eslint-disable */
import { gettingData } from './firebasefunction.js';
import { postStructure } from './domStructures.js';

export default () => {
	const template = document.querySelector('#template-profile');
	const clon = template.content.cloneNode(true);
	root.appendChild(clon);

	const container = document.querySelector('.container-all-post');

	const user = firebase.auth().currentUser;
	const uid = user.uid;

	const photoUser = document.querySelector('.user-img');
	const nameTimeline = document.querySelector('.user-name');
	const formShare = document.querySelector('.form-share');

	//Traer nombre y foto correctamente y todos los datos de la biografía
	gettingData('users', uid).then((doc) => {
		photoUser.src = doc.photoURL;
		nameTimeline.textContent = doc.name;
	});
   
    db.collection('post').where('uid', '==', uid).get().then((doc) => {
		doc.forEach(function (doc2) {
			console.log(doc2.id, ' =>', doc2.data());
			container.appendChild(postStructure(doc2, uid));
		});
	});

    const editProfile = document.querySelector('.edit-profile');
    console.log(editProfile);
    
    editProfile.addEventListener('click', (e) =>{
        editProfileModal(uid);
    });
    
    const editProfileModal = (uid) =>{
        console.log('Aquí se abre el modal');
        const template = document.querySelector('#modal-edit-profile');
		console.log(template);
		var clon = template.content.cloneNode(true);
        root.appendChild(clon);
        
        const modalContainer = document.getElementsByClassName('modal-container-editprofile')[0];
		console.log(modalContainer);
        modalContainer.style.display = 'block';
        
        const closeModal = document.querySelector('.close-modal');

        closeModal.addEventListener('click', () => {
            root.removeChild(modalContainer);
            modalContainer.style.display = 'none';
        });

        modalContainer.addEventListener('click', () => {
            if (event.target == modalContainer) {
                modalContainer.style.display = 'none';
                root.removeChild(modalContainer);
            }
        });
    }




    const btnLogOut = document.querySelectorAll('.logout');

	btnLogOut.forEach((item) => {
		item.addEventListener('click', () => {
			logOutAccount();
			window.location.hash = '';
		});
	});

	const menuTimeline = document.querySelectorAll('.menu-timeline');

	menuTimeline.forEach((item) => {
		item.addEventListener('click', () => {
			window.location.hash = 'timeline';
		});
	});

	const menuEvents = document.querySelectorAll('.menu-events');

	menuEvents.forEach((item) => {
		item.addEventListener('click', () => {
			window.location.hash = 'events';
		});
	});

};
