import { createUserEmailAndPassword } from "../src/lib/firebasefunction.js";

describe('createUserEmailAndPassword', () => {
    it('La respuesta debería ser un objeto', async () => {
        const response = await createUserEmailAndPassword('maria@gmail.com', 'adfdgh124/')
        expect(typeof response).toBe('object')
    })

    it('si envío una contraseña corta devolverá error', async () => {
        await expect(createUserEmailAndPassword('maria@gmail.com', '124')).rejects.toThrow('error')
    })
})
