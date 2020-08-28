/* eslint-disable */
import { gettingData } from './firebasefunction.js';
import { postStructure } from './domStructures.js';

export default () => {
	const template = document.querySelector('#template-profile');
	const clon = template.content.cloneNode(true);
	root.appendChild(clon);

	const menuTimeline = document.querySelectorAll('.menu-timeline');

	const container = document.querySelector('.container-all-post');

	container.textContent = 'My posts & hosted events!';

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



	//let refpost = db.collection('post');

	db.collection('post').where('uid', '==', uid).orderBy('date').get().then((doc)=>{
	doc.forEach(function(doc2){
		console.log(doc2.id, " =>" , doc2.data());
		container.appendChild(postStructure(doc2, uid));
		});	
	});

	db.collection('post').orderBy('date', 'desc').get()



	// db.collection('post').orderBy('date', 'desc').get().then((doc) =>{
	// 	doc.where('uid', '==', uid).get().then((doc)=>{
	// 		doc.forEach(function(doc2){
	// 			console.log(doc2.id, " =>" , doc2.data());
	// 			container.appendChild(postStructure(doc2, uid));
	// 		});
				
	// 		});
		
	// });

	db.collection('post').orderBy('date', 'desc').get().then((doc) =>{

	}



	menuTimeline.forEach((item) => {
		item.addEventListener('click', () => {
			window.location.hash = 'timeline';
		});
	});
};
