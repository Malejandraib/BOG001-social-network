//Aquí importamos el objeto que manipula los js de las vistas 
import { myFunction } from "./lib/index.js"; myFunction();
import signup from './lib/signup.js';
import signin from './lib/signin.js';
import timeline from './lib/timeline.js';
import notfound from './lib/notfound.js';
import profile from './lib/profile.js';
//import {changeState} from './lib/firebasefunction.js';

const pages = {
    signup,
    signin,
    timeline,
    profile,
    notfound
};

export const router = (route) =>{

    let content = document.getElementById('root');
            firebase.auth().onAuthStateChanged(function(user) {
                content.innerHTML = "";
                if (user) {      
                    switch(route) {
                        case '':
                            //puede hacer un redirect a timeline de una                            
                            return pages.signup();
                        case '#signin':
                            return pages.signin();
                        case '#timeline':
                            return pages.timeline(); //acción que dce hash = timeline  
                        case '#profile':
                            return pages.profile();
                        case '#help':
                            return content.innerHTML = "<p>Help</p>";
    
                            default:
                            return pages.notfound();
                    }
                } else {
                    switch(route) {
                        case '':
                            return pages.signup();
                        case '#signin':
                            return pages.signin(); 
                        default:
                            return pages.notfound();
                    }
                }
            });  
}

