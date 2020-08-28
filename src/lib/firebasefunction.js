/* eslint-disable */
//  ----- Creating user with email and password -----
async function createUserEmailAndPassword(email, password) {
	try {
		const authentication = await firebase.auth().createUserWithEmailAndPassword(email, password);
		console.log(authentication);
		return authentication; //   objeto que trae mucas cosas
	} catch (error) {
		let errorMessage = error.message;
		return errorMessage;
	}
}

//  ---------- Creating and login user with google account ------------
async function registerGoogle(provider) {
	try {
		const registerTemp = await firebase.auth().signInWithPopup(provider);
		return registerTemp;
	} catch (error) {
		return error;
	}
}

//  -----------signInEmailAndPassword------------
async function signInEmailAndPassword(email, password) {
	try {
		const signInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
		console.log(signInUser);
		return signInUser;
	} catch (error) {
		var errorMessage = error.message;
		return errorMessage;
	}
}

//  -----------gettingData------------
async function gettingData(collection, uid) {
	try {
		const dataUser = await db.collection(collection).doc(uid).get();
		return dataUser.data();
	} catch (error) {
		return error.message;
	}
}

//  -----------gettingDataOrderByCondition------------
async function gettingDataOrdered(collection, param, asds) {
	try {
		const dataPost = await db.collection(collection).orderBy(param, asds).get();
		return dataPost;
	} catch (error) {
		return error.message;
	}
}

//  -----------newPost------------
async function newPost(userGeneral) {
	try {
		const creatingPost = await db.collection('post').add({
			uid: userGeneral.uid,
			post: userGeneral.post, //Es que acá había puesto dizque inputPost y era solo post
			name: userGeneral.name,
			photo: userGeneral.photo,
			date: userGeneral.date,
			editPost: false,
			likes: [],
		});
		return creatingPost;
	} catch (error) {
		return error.message;
	}
}

//  -----------Edit post------------
async function editingPostDocument(idPost, inputModal) {
	try {
		let editPost = await db.collection('post').doc(idPost);
		const postEditado = editPost.update({
			post: inputModal,
			editState: true,
		});

		return postEditado;
	} catch (error) {
		return error;
	}
}

//  -----------updateLikes------------
async function updateLikes(idPost, uidArray) {
	try {
		let editPost = await db.collection('post').doc(idPost);
		const update = editPost.update({
			likes: uidArray,
		});

		return update;
	} catch (error) {
		return error;
	}
}

//  -----------Delete post------------
async function deletingPostModal(idPost) {
	try {
		let selectPost = await db.collection('post').doc(idPost);
		const deletingPost = selectPost.delete();
		return deletingPost;
	} catch (error) {
		return error;
	}
}

//  --------- Logingout account ------------
async function logOutAccount() {
	var user = firebase.auth().currentUser;
	try {
		const signoutUser = firebase.auth().signOut();
		return signoutUser;
	} catch (error) {
		return error;
	}
}

export { createUserEmailAndPassword, registerGoogle, logOutAccount, signInEmailAndPassword };
export { gettingData, newPost, gettingDataOrdered, editingPostDocument, deletingPostModal, updateLikes };
