/* const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;

const { productsRoutes } = require('../../../src/routes');
const { productsController } = require('../../../src/controllers');

const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
} = require('../../mocks/products.mocks');

chai.use(chaiHttp);

describe('Testes PRODUCTS ROUTES', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todos os produtos', async function () {
    const mock = sinon.stub(productsController, 'findAllProducts').resolves({
      status: 'SUCCESSFUL',
      data: findAllProductsResponseOk,
    });

    const res = await chai.request(productsRoutes).get('/');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(findAllProductsResponseOk);
    expect(mock.calledOnce).to.be.true();
  });

  it('Deve retornar um produto específico', async function () {
    const stub = sinon.stub(productsController, 'findByIdProducts').resolves();

    const res = await chai.request(routes).get('/:id');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal();
    expect(stub.calledOnce).to.be.true;
  });
});
 */