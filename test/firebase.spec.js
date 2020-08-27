/* eslint-disable */
import { createUserEmailAndPassword } from "../src/lib/firebasefunction.js";
import {user_3} from "./__mocks__/users.js" 


describe('createUserEmailAndPassword', () => {
    it('La respuesta debería ser un objeto', async () => {
        const response = await createUserEmailAndPassword('maria@gmail.com', 'Adfdgh124/')
        expect(response).toMatch(user_3) //creo que es toEqual to be solo sirvbve con typeof
    })

    it('si envío una contraseña corta devolverá error', async () => {
        await createUserEmailAndPassword('mariagmail.com', '').catch(e => expect(e).toMatch(errorMessage)); //errorMessage sin comillas, es un objeto
    })
//ya
    test.only('Malito', async () =>{
        createUserEmailAndPassword('alejndraprz@gmail.com', 'abcABC123').catch((errorMessage) =>{
            expect(errorMessage).toStrictEqual('The email address is already  in use by another account.');
        })
    }); 

})


