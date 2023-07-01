const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  findAllProductsResponseOk,
  findByIdProductsResponseOk,
  insertProductsResponseOk,
  findAllProductsResponseOkNormalized,
} = require('../../mocks/products.mocks');

describe('Testes PRODUCTS MODEL', function () {
  const inputInsert = { name: 'Capacete do Pacificador' };

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

    const response = await productsModel.insertProducts(inputInsert);

    expect(response).to.be.an('object');
    expect(response.name).to.equal('Capacete do Pacificador');
  });

  it('tenta atualizar um produto com id inexistente', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves()
    .onSecondCall()
    .resolves();

    const response = await productsModel.updateProducts(inputInsert, 999);

    expect(response).to.be.an('undefined');
  });

  it('Atualiza um produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllProductsResponseOkNormalized])
    .onSecondCall()
    .resolves();

    const response = await productsModel.updateProducts(inputInsert, 1);

    expect(response).to.be.an('object');
    expect(response.id).to.equal(1);
    expect(response.name).to.equal('Capacete do Pacificador');
  });

  it('tenta deletar um produto com id inexistente', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves()
    .onSecondCall()
    .resolves();

    const response = await productsModel.deleteProducts(999);

    expect(response).to.be.an('undefined');
  });

  it('Deleta um produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllProductsResponseOkNormalized])
    .onSecondCall()
    .resolves();
  
    const response = await productsModel.deleteProducts(3);
  
    expect(response).to.equal('DELETED');
  });

  afterEach(function () {
    sinon.restore();
  });
});