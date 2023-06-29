const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../../src/app');
// const { productsRoutes } = require('../../../src/routes');
// const { productsController } = require('../../../src/controllers');

const {
  findByIdProductsResponseOk,
  findByIdProductsResponseError,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS ROUTES', function () {
  /* it('Recupera todos os produtos /products', async function () {
    const stubResponse = {
      status: 200,
      body: findAllProductsResponseOkNormalized,
    };

    sinon.stub(productsController, 'findAllProducts').resolves(stubResponse);

    const response = await chai.request(app).get('/products');
    
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(findAllProductsResponseOkNormalized);
  }); */

  it('Recupera produto por id /products/:id com sucesso', async function () {
    const response = await chai
    .request(app)
    .get('/products/2');
    
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(findByIdProductsResponseOk);
  });

  it('tenta recuperar produto por id /products/:id sem sucesso', async function () {
    const response = await chai
    .request(app)
    .get('/products/9999');
    
    expect(response).to.have.status(404);
    expect(response.body).to.deep.equal(findByIdProductsResponseError);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
