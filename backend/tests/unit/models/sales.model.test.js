const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
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

  afterEach(function () {
    sinon.restore();
  });
});