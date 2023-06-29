const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../../src/app');
/* const { productsRoutes } = require('../../../src/routes');
const { productsController } = require('../../../src/controllers'); */

const {
  findByIdProductsResponseOk,
  findAllProductsResponseOkNormalized,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS ROUTES', function () {
  it('Recupera todos os produtos /products', async function () {
    const response = await chai
    .request(app)
    .get('/products');
    
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(findAllProductsResponseOkNormalized);
  });

  it('Recupera produto por id /products/:id', async function () {
    const response = await chai
    .request(app)
    .get('/products/2');
    
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(findByIdProductsResponseOk);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
