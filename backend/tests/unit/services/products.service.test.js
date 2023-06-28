const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS SERVICES', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(findAllProductsResponseOk);

    const { status, data } = await productsService.findAllProducts();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('array');
    expect(data).to.have.lengthOf(3);
    expect(data).to.be.deep.equal(findAllProductsResponseOk);
  });

  it('Recupera produto por id com sucesso', async function () {
    sinon.stub(productsModel, 'findByIdProducts').resolves(findByIdProductsResponseOk);

    const { status, data } = await productsService.findByIdProducts(2);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(findByIdProductsResponseOk);
  });

  it('Tenta recuperar produto com id inexistente', async function () {
    sinon.stub(productsModel, 'findByIdProducts').resolves(undefined);

    const { status, data } = await productsService.findByIdProducts(9999);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.a('string');
    expect(data.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});