import chai from 'chai'
import supertest from 'supertest'
import { fakerES_MX as faker } from '@faker-js/faker'

const expect = chai.expect

const requester = supertest('http://localhost:8080')

describe('Corriendo test de Sessions', () => {
    it('Debería crear un nuevo usuario haciendo POST en /api/signup', async function () {
        this.timeout(5000)
        const userMock = {
            first_name: "Usuario",
            last_name: "de Prueba",
            email: `test@${faker.string.alphanumeric({ length: { min: 5, max: 10 } })}.com`,
            age: 100,
            password: "1234",
        }

        const result = await requester.post('/api/signup').send(userMock)

        expect(result).to.be.ok
        expect(result.statusCode, 200)

    })

    it('Debería logearse con el usuario pablo galeano haciendo un POST en /api/login', async () => {
        let cookie
        const userMock = {
            email: "pablogaleano88@hotmail.com",
            password: "123",
        }

        const result = await requester.post(`/api/login`).send(userMock)

        const cookieResult = result.header['set-cookie'][0]

        expect(cookieResult).to.be.ok

        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }

        expect(cookie.name).to.be.ok.and.eql('connect.sid')
        expect(cookie.value).to.be.ok
    })

    it('Debería cambiar de user a premium', async () => {
    
        const uid = "65728905659928a8f4dd9057"
    
        const result = await requester.put(`/api/users/premium/${uid}`)
    
        const { statusCode, ok, _body } = result
    
        expect(statusCode, 200)
        expect(ok, true)
        expect(result.text).to.be.oneOf(['user', 'premium'])
    
    
    })
})
