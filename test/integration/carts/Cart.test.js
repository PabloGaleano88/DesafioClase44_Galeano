import chai from 'chai'
import supertest from 'supertest'
import { fakerES_MX as faker } from '@faker-js/faker'

const expect = chai.expect

const requester = supertest('http://localhost:8080')

describe('Corriendo test de Carts', () => {
    it('Debería traer un carrito al hacer GET a /api/carts/:cid', async function () {
        this.timeout(5000)
        const cid = "65728905659928a8f4dd9055"
        const result = await requester.get(`/api/carts/${cid}`)
        const { statusCode, ok, _body } = result

        expect(statusCode, 200)
        expect(ok, true)
        expect(_body[0]).to.have.property('_id')
        expect(Array.isArray(_body[0].products)).to.be.true
    })

    it('Debería agregar el producto de id 650bc6a39c94bc9f1651c6f3 haciendo POST a /api/carts', async () => {
        const cid = '65728905659928a8f4dd9055'
        const pid = '650bc6a39c94bc9f1651c6f3'
    
        const result = await requester.post(`/api/carts/${cid}/products/${pid}`)
    
        const { statusCode, ok, _body } = result
    
        const searchProduct =_body[0].products.find(product=> product.productId._id === pid)
        const searchID = searchProduct.productId._id
        expect(statusCode, 200)
        expect(ok, true)
        expect(Array.isArray(_body)).to.be.true
        expect(searchID).to.equal("650bc6a39c94bc9f1651c6f3")
    })

    it('Debería devolver un array de productos al hacer PUT a /api/carts/:cid/products/:pid se modificará a 5 la cantidad de mouses al carrito y luego a 1', async () => {
        const cid = '65728905659928a8f4dd9055'
        const pid = '650bc6a39c94bc9f1651c6f3'
    
        const quant = faker.number.int(10)
        const bodyQuantity={ quantity : quant}
    
        const result = await requester.put(`/api/carts/${cid}/products/${pid}`).send(bodyQuantity)
    
        const { statusCode, ok, _body } = result
        
        const searchProduct = _body.products.find(product => product.productId === pid)
        
        expect(statusCode, 200)
        expect(ok, true)
        expect(_body).to.have.property('_id')
        expect(_body._id).to.be.equal("65728905659928a8f4dd9055")
        expect(searchProduct.quantity).to.equal(quant)
    })
})
