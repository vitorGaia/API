const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
  insertProductsResponseOk,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS CONTROLLERS', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productsService, 'findAllProducts').resolves({
      status: 'SUCCESSFUL',
      data: findAllProductsResponseOk,
    });

    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findAllProductsResponseOk);
  });

  it('Recupera produto por id com sucesso', async function () {
    sinon.stub(productsService, 'findByIdProducts').resolves({
      status: 'SUCCESSFUL',
      data: findByIdProductsResponseOk,
    });

    const req = {
      params: { id: 2 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findByIdProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findByIdProductsResponseOk);
  });

  it('Insere produto com sucesso', async function () {
    sinon.stub(productsService, 'insertProducts').resolves({
      status: 'SUCCESSFUL',
      data: insertProductsResponseOk,
    });

    const inputInsert = { name: 'Capacete do Pacificador' };

    const req = {
      params: { },
      body: inputInsert,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(insertProductsResponseOk);
  });

  afterEach(function () {
    sinon.restore();
  });
});