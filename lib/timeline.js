/* eslint-disable */
//import { gettingData, newPost, logOutAccount, gettingDataOrdered, editingPostDocument, deletingPostModal, updateLikes } from './firebasefunction.js';
import { gettingData, newPost, logOutAccount, gettingDataOrdered } from './firebasefunction.js';
import { postStructure, eventStructure } from './domStructures.js';
import { editAnyPost, deleteAnyPost, likeAnyPost } from './postFunctions.js';

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

	gettingData('users', uid).then((doc) => {
		photoUser.src = doc.photoURL;
		nameTimeline.textContent = doc.name;
	});

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
				};

				newPost(postData);
			});
			formShare.reset();
		} else {
			alert('Please enter your post');
		}
	}); //termina nuevo post

	const specificContainer = document.querySelector('.container-all-post');
	//OnSnapshot, aún no sabemos bien cómo usarlo
	db.collection('post').onSnapshot(function (doc) {
		


		gettingDataOrdered('post', 'date', 'desc').then(function (doc) {
			specificContainer.innerHTML = '';
			doc.forEach(function (doc) {
				specificContainer.appendChild(postStructure(doc, uid)); //Aquí es donde se hace la estructura
			});

			deleteAnyPost();
			editAnyPost();
			likeAnyPost(uid);

		}); //GettingDataDETimeline
	}); //Snapshot

	//Para hacer logout
	btnLogOut.forEach((item) => {
		item.addEventListener('click', () => {
			logOutAccount();
			window.location.hash = '';
		});
	});

	const menuProfile = document.querySelectorAll('.menu-profile');

	menuProfile.forEach((item) => {
		item.addEventListener('click', () => {
			window.location.hash = 'profile';
		});
	});

	const menuEvents = document.querySelectorAll('.menu-events');

	menuEvents.forEach((item) => {
		item.addEventListener('click', () => {
			window.location.hash = 'events';
		});
	});


};
