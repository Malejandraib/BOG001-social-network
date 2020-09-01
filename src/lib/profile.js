/* eslint-disable */
import { gettingData, logOutAccount } from './firebasefunction.js';
import { postStructure } from './domStructures.js';
import {editAnyPost, deleteAnyPost, likeAnyPost} from './postFunctions.js';

export default () => {
	const template = document.querySelector('#template-profile');
	const clon = template.content.cloneNode(true);
	root.appendChild(clon);

	const container = document.querySelector('.container-my-post');

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

	

		
	
		db.collection("post").onSnapshot(function(doc) {
			
				db.collection('post').where('uid', '==', uid).get().then((doc) => {
					container.innerHTML = '';
				
					doc.forEach(function (doc) {
						container.appendChild(postStructure(doc, uid));
					});
						deleteAnyPost();
						editAnyPost();
						likeAnyPost(uid);
		
						
				});
    });

		const editProfileButton = document.querySelector('.edit-profile');

		editProfileButton.addEventListener('click', () => {
			editProfileModal(uid);
		});
    
    
    const editProfileModal = (uid) =>{
       
        const template = document.querySelector('#modal-edit-profile');
				
				var clon = template.content.cloneNode(true);
        root.appendChild(clon);
        
        const modalContainerEditProfile = document.getElementsByClassName('modal-container-editprofile')[0];
        modalContainerEditProfile.style.display = 'block';
        
        const closeModal = document.querySelector('.close-modal');

        closeModal.addEventListener('click', () => {
            root.removeChild(modalContainerEditProfile);
            modalContainerEditProfile.style.display = 'none';
				});
				

        modalContainerEditProfile.addEventListener('click', () => {
            if (event.target == modalContainerEditProfile) {
                modalContainerEditProfile.style.display = 'none';
                root.removeChild(modalContainerEditProfile);
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
