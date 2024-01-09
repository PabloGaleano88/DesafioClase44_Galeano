import chai from 'chai'
import supertest from 'supertest'
import { fakerES_MX as faker } from '@faker-js/faker'

const expect = chai.expect

const requester = supertest('http://localhost:8080')

let idCreated = null
describe('Corriendo test de Products', () => {
    it('Debería crear un nuevo producto al hacer un POST a /api/products', async function () {
        this.timeout(5000)
        const productMock = {
            title: "producto de prueba ",
            price: 123,
            description: "Este es un producto de prueba",
            category: "electronica",
            stock: 5,
            code: faker.string.alphanumeric({ length: { min: 5, max: 10 } })

        }
        const result = await requester.post('/api/products')
            .field('title', productMock.title)
            .field('price', productMock.price)
            .field('description', productMock.description)
            .field('category', productMock.category)
            .field('stock', productMock.stock)
            .field('code', productMock.code)
            .attach('file', './test/integration/products/test.jpg')

        const { statusCode, ok, _body } = result
        idCreated = _body._id
        expect(statusCode, 200)
        expect(ok, true)
        expect(_body).to.have.property('_id')
        expect(_body.code).to.be.equal(productMock.code)
    })

    it('Debería eliminar el producto creado anteriormente', async () => {
        if (idCreated) {
            const result = await requester.delete(`/api/products/${idCreated}`)

            const { statusCode, ok, _body } = result

            expect(statusCode, 200)
            expect(ok, true)
            expect(Array.isArray(_body)).to.be.true


        }
    })

    it('Debería devolver un producto según el ID requerido', async () => {
        const pid = '650bc6a39c94bc9f1651c6f3'

        const result = await requester.get(`/api/products/${pid}`)

        const { statusCode, ok, _body } = result

        expect(statusCode, 200)
        expect(ok, true)
        expect(_body).to.have.property('_id')
        expect(_body.code).to.be.equal('LOGIMX3')
    })

})
