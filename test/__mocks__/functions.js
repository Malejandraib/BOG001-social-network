/* eslint-disable */

export function createUserEmailAndPasswordFake(email, name) {
	const authentication = {
		email: email,
		name: name,
		photoURL: '../images/pic2.jpg',
	};
	return authentication; //   objeto que trae mucas cosas
}

export function signInEmailAndPasswordFake(email) {
	const signInUser = {
		email: email,
		name: 'name',
		photoURL: '../images/pic2.jpg',
		uid: 'f7lNmynZnfemi6kGi9uxC4AIZo52',
	};
	return signInUser;
}

export function gettingDataFake(email) {
	const user1 = {
		email: email,
		name: 'Alejandra Pérez Mondragón',
		photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gj2k9NDGJjTKlTBKpLvs8kdY4jf0bCobnrhwxny-58',
		uid: 'DZP4onfLYjd4mzBFL07aMdy6qDz2',
	};
	return user1
}

export function newPostFake(post){
    const post1 = {
        date: '25 de agosto de 2020, 12:00:33 UTC-5', 
        editPost: false,
        likes: ['JwDxdGEc2ge5oe9yMHiDnnhNeSj2', 'DZP4onfLYjd4mzBFL07aMdy6qDz2'],
        name: 'Alejandra Pérez Mondragón',
        photo: 'https://lh3.googleusercontent.com/a-/AOh14Gj2k9NDGJjTKlTBKpLvs8kdY4jf0bCobnrhwxny-58',
        post: post,
        uid: 'DZP4onfLYjd4mzBFL07aMdy6qDz2',
    };
    return post1
}

export function editingPostDocumentFake(uid, post){
    const postEdited = {
        date: '25 de agosto de 2020, 12:04:26 UTC-5',
        editPost: false,
        editState: true,
        name: 'Alejandra Pérez Mondragón',
        photo: 'https://lh3.googleusercontent.com/a-/AOh14Gj2k9NDGJjTKlTBKpLvs8kdY4jf0bCobnrhwxny-58',
        post: post,
        uid: uid,
    };
    return postEdited
}

export function updateLikesFake(uid, uidArray){
    const likes = {
        date: '25 de agosto de 2020, 12:04:26 UTC-5',
        editPost: false,
        editState: true,
        likes: [
            'JwDxdGEc2ge5oe9yMHiDnnhNeSj2',
            'f4jdzx5WyAWFKceY1XHNOFQ5XH13',
            uidArray,
            'DZP4onfLYjd4mzBFL07aMdy6qDz2',
        ],
        name: 'Alejandra Pérez Mondragón',
        photo: 'https://lh3.googleusercontent.com/a-/AOh14Gj2k9NDGJjTKlTBKpLvs8kdY4jf0bCobnrhwxny-58',
        post: 'Este es para confirmar confirmar',
        uid: uid,
    };
    return likes
}

export function deletePostFake(uid){
    const postDeleted = {
        date: 'null',
        editPost: 'null',
        editState: 'null',
        likes: 'null',
        name: 'null',
        photo: 'null',
        post: 'null',
        uid: uid,
    };
    return postDeleted
}

export function logoutAccountFake(){
    
}