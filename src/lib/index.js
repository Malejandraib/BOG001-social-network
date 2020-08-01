// aqui exportaras las funciones que necesites
import signup from './signup.js';
import signin from './signin.js';



export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

const pages = {
  signup: signup,
  signin: signin,
};

export { pages };