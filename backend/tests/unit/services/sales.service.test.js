const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
} = require('../../mocks/sales.mocks');

describe('Testes SALES SERVICES', function () {
  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(findAllSalesResponseOk);

    const { status, data } = await salesService.findAllSales();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('array');
    expect(data).to.have.lengthOf(3);
    expect(data).to.be.deep.equal(findAllSalesResponseOk);
  });

  it('Recupera vendas por id com sucesso', async function () {
    sinon.stub(salesModel, 'findByIdSales').resolves(findByIdSalesResponseOk);

    const { status, data } = await salesService.findByIdSales(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('array');
    expect(data).to.have.lengthOf(2);
    expect(data).to.be.deep.equal(findByIdSalesResponseOk);
  });

  it('Tenta recuperar vendas com id inexistente', async function () {
    sinon.stub(salesModel, 'findByIdSales').resolves(undefined);

    const { status, data } = await salesService.findByIdSales(1);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.a('string');
    expect(data.message).to.be.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});