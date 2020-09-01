/* eslint-disable */
import {createUserEmailAndPasswordFake, signInEmailAndPasswordFake, gettingDataFake, newPostFake, editingPostDocumentFake, updateLikesFake, deletePostFake, logoutAccountFake} from './__mocks__/functions.js';
import {createUserEmailAndPassword, signInEmailAndPassword, gettingData, newPost,editingPostDocument, updateLikes, deletingPostModal, logOutAccount} from '../src/lib/firebasefunction.js';

// ------- Create user with email and password
describe('createUserEmailAndPassword', () => {
	it('debería ser una función', () => {
		expect(typeof createUserEmailAndPassword).toBe('function');
	});

	it('si se registra correctamente debe retornar un objeto que contiene su email', () => {
		const response = createUserEmailAndPasswordFake('luke20202@luke.com', 'luke');
		expect(response.email).toEqual('luke20202@luke.com');
	});

	it('si envío una contraseña corta devolverá error', async () => {
		await createUserEmailAndPassword('mariagmail.com', '').catch((e) => expect(e).toMatch(errorMessage)); 
	});

	it('si el correo está en uso por otra cuenta devolverá un msje de error', async () => {
		createUserEmailAndPassword('alejndraprz@gmail.com', 'abcABC123').catch((errorMessage) => {
			expect(errorMessage).toStrictEqual('The email address is already in use by another account.');
		});
	});
});

// ----- SignIn Email and password
describe('Función signInwithEmailAndPassword', () => {
	it('debería ser una función', () => {
		expect(typeof signInEmailAndPassword).toBe('function');
	});

	it('deberia loggear en el la aplicación y obtener el objeto de usuario existente', () => {
		const signIn = signInEmailAndPasswordFake('luke2020@luke.com');
		expect(signIn.uid).toEqual('f7lNmynZnfemi6kGi9uxC4AIZo52');
	});

	it('si la contraseña es incorrecta devolverá un msje de error', async () => {
		createUserEmailAndPassword('luke2020@luke.com', 'abcABC123333').catch((errorMessage) => {
			expect(errorMessage).toStrictEqual('The password is invalid or the user does not have a password.');
		});
	});
});

// ----- gettingData
describe('Función getting data /los datos del usuario/', () => {
	it('gettingData debe ser una función', () => {
		expect(typeof gettingData).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const data = gettingDataFake('alejndraprz@gmail.com');
		expect(data.uid).toEqual('DZP4onfLYjd4mzBFL07aMdy6qDz2');
	});

	it('se obtedrá un mensaje de error', async () => {
		await gettingData('users', 'DZP4onfLYjd4mzBFL07aMdy6qDz2').catch((e) => expect(e).toMatch(errorMessage)); 
	});
});

// ------- new post
describe('Función newPost /creación de objeto en la colección de post/', () => {
	it('newPost debe ser una función', () => {
		expect(typeof newPost).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const post = newPostFake('Este es para confirmar confirmar');
		expect(post.date).toEqual('25 de agosto de 2020, 12:00:33 UTC-5');
	});

	it('se obtedrá un mensaje de error', async () => {
		await newPost(' ').catch((e) => expect(e).toMatch(errorMessage)); 
	});
});

//	---------Editing post 
describe('Función editingPostDocument /hace update al objeto de la coleccion de post/', () => {
	it('newPost debe ser una función', () => {
		expect(typeof editingPostDocument).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const postEdited = editingPostDocumentFake('DZP4onfLYjd4mzBFL07aMdy6qDz2', 'Estoy editando bien normie desde el celular, qué emoción');
		expect(postEdited.date).toEqual('25 de agosto de 2020, 12:04:26 UTC-5');
	});

	it('se obtedrá un mensaje de error', async () => {
		await editingPostDocument(' ').catch((e) => expect(e).toMatch(errorMessage)); 
	});
});

// 	-------- UpdateLikes 
describe('Función updateLikes /agrega el uid del like al array de likes del dueño del post/', () => {
	it('updateLikes debe ser una función', () => {
		expect(typeof updateLikes).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const likes = updateLikesFake('DZP4onfLYjd4mzBFL07aMdy6qDz2', 'IgWNDmp4FHSCs2TlMYFWKG0dDQD2');
		expect(likes.likes).toEqual([
            'JwDxdGEc2ge5oe9yMHiDnnhNeSj2',
            'f4jdzx5WyAWFKceY1XHNOFQ5XH13',
            'IgWNDmp4FHSCs2TlMYFWKG0dDQD2',
            'DZP4onfLYjd4mzBFL07aMdy6qDz2',
        ]);
	});

	it('se obtedrá un mensaje de error', async () => {
		await updateLikes(' ').catch((e) => expect(e).toMatch(errorMessage)); 
	});
});

//-------- Delete post 
describe('Función deletePost /elimina la colección del post creado/', () => {
	it('deletePost debe ser una función', () => {
		expect(typeof deletingPostModal).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const post = deletePostFake('DZP4onfLYjd4mzBFL07aMdy6qDz2');
		expect(post.likes).toEqual('null');
	});

	it('se obtedrá un mensaje de error', async () => {
		await deletingPostModal(' ').catch((e) => expect(e).toMatch(errorMessage)); 
	});
});

//-------- LoggingOut
describe('Función logOutAccount /Termina la sesion para el usuario/', () => {
	it('deletePost debe ser una función', () => {
		expect(typeof logOutAccount).toBe('function');
	});

	it('deberá retornar un objeto con las propiedades asignadas de la colección', () => {
		const post = logoutAccountFake('DZP4onfLYjd4mzBFL07aMdy6qDz2');
		expect(post.likes).toEqual('null');
	});

	it('se obtedrá un mensaje de error', async () => {
		await logOutAccount().catch((e) => expect(e).toMatch(errorMessage)); 
	});
});
