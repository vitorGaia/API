const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS MODEL', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([findAllProductsResponseOk]);

    const products = await productsModel.findAllProducts();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(findAllProductsResponseOk);
  });

  it('Recupera produto por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[findByIdProductsResponseOk]]);

    const product = await productsModel.findByIdProducts(2);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(findByIdProductsResponseOk);
  });

  afterEach(function () {
    sinon.restore();
  });
});