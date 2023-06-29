const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
  insertProductsResponseOk,
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

  it('Insere produto no banco de dados com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([insertProductsResponseOk]);

    const inputInsert = { name: 'Capacete do Pacificador' };
    const response = await productsModel.insertProducts(inputInsert);

    expect(response).to.be.an('object');
    expect(response.name).to.equal('Capacete do Pacificador');
  });

  afterEach(function () {
    sinon.restore();
  });
});