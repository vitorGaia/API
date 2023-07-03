const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
  insertSalesResponseOk,
  updateSalesResponseOk,
} = require('../../mocks/sales.mocks');

describe('Testes SALES MODEL', function () {
  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([findAllSalesResponseOk]);

    const sales = await salesModel.findAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(findAllSalesResponseOk);
  });

  it('Recupera vendas por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([findByIdSalesResponseOk]);

    const sales = await salesModel.findByIdSales(1);

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(2);
    expect(sales).to.be.deep.equal(findByIdSalesResponseOk);
  });

  it('Tenta recuperar vendas com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const sales = await salesModel.findByIdSales(999);

    expect(sales).to.be.deep.equal(undefined);
  });

  it('Isere produtos vendidos com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([{ insertId: 3 }])
    .onSecondCall()
    .resolves(insertSalesResponseOk);

    const input = [
      {
        productId: 1,
        quantity: 27,
      },
      {
        productId: 2,
        quantity: 27,
      },
    ];
    const response = await salesModel.insertSales(input);

    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal(insertSalesResponseOk);
  });

  it('tenta deletar uma venda com id inexistente', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllSalesResponseOk])
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves();

    const response = await salesModel.deleteSales(999);

    expect(response).to.be.an('undefined');
  });

  it('Deleta uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllSalesResponseOk])
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves();
  
    const response = await salesModel.deleteSales(1);
  
    expect(response).to.equal('DELETED');
  });

  it('Tenta atualizar a quantidade de uma venda com saleId inexistente', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllSalesResponseOk])
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves();

    const response = await salesModel.updateSales(999, 1, { quantity: 777 });

    expect(response).to.be.equal('Sale not found');
  });

  it('Tenta atualizar a quantidade de uma venda com productId inexistente', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllSalesResponseOk])
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves();

    const response = await salesModel.updateSales(1, 999, { quantity: 777 });

    expect(response).to.be.equal('Product not found in sale');
  });

  it('Atualiza a quantidade de um produto vendido com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([findAllSalesResponseOk])
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves([updateSalesResponseOk]);

    const response = await salesModel.updateSales(1, 1, { quantity: 777 });

    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal(updateSalesResponseOk);
  });

  afterEach(function () {
    sinon.restore();
  });
});