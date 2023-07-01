const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
  insertSalesResponseOk,
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

  afterEach(function () {
    sinon.restore();
  });
});