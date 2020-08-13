//Aquí importamos el objeto que manipula los js de las vistas 
import { myFunction } from "./lib/index.js"; myFunction();
import signup from './lib/signup.js';
import signin from './lib/signin.js';
import timeline from './lib/timeline.js';
import notfound from './lib/notfound.js';
//import {changeState} from './lib/firebasefunction.js';

const pages = {
    signup,
    signin,
    timeline,
    notfound
};

export const router = (route) =>{

    // changeState();
    // const createstate = changeState();
    // console.log(createstate);

    let content = document.getElementById('root');
    content.innerHTML = "";

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log(user.displayName);       
                    switch(route) {
                        case '':
                            return pages.signup();
                        case '#signin':
                            return pages.signin();
                        case '#timeline':
                            return pages.timeline();   
                        default:
                            return pages.notfound();
                    }
                } else {
                    console.log("nope");
                    switch(route) {
                        case '':
                            return pages.signup();
                        case '#signin':
                            return pages.signin();
                        case '#timeline':
                            return pages.notfound();   
                        default:
                            return pages.notfound();
                    }
                }
            });  
}

