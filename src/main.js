// Este es el punto de entrada de tu aplicacion
// Aquí importamos la función de ruteo
/* eslint-disable */
import {router} from './router.js';

const init = () => {
	router(window.location.hash);

	window.addEventListener('hashchange', () => {
		router(window.location.hash);
	});
};

window.addEventListener('load', init);
