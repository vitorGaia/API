const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
  insertSalesResponseOk,
  updateSalesResponseOk,
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

  it('Insere vendas no banco de dados com sucesso', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(insertSalesResponseOk);

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
    const { status, data } = await salesService.insertSales(input);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(insertSalesResponseOk);
  });

  it('Tenta deletar uma venda que não existe', async function () {
    sinon.stub(salesModel, 'deleteSales').resolves(undefined);

    const { status, data } = await salesService.deleteSales(1);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Deleta uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'deleteSales').resolves('DELETED');

    const { status } = await salesService.deleteSales(1);

    expect(status).to.be.equal('DELETED');
  });

  it('Tenta atualizar a quantidade de uma venda com saleId inexistente', async function () {
    sinon.stub(salesModel, 'updateSales').resolves('Sale not found');

    const { status, data } = await salesService.updateSales(999, 1, { quantity: 777 });

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.a('string');
    expect(data.message).to.be.equal('Sale not found');
  });

  it('Tenta atualizar a quantidade de uma venda com productId inexistente', async function () {
    sinon.stub(salesModel, 'updateSales').resolves('Product not found in sale');

    const { status, data } = await salesService.updateSales(1, 999, { quantity: 777 });

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.a('string');
    expect(data.message).to.be.equal('Product not found in sale');
  });

  it('Atualiza a quantidade de um produto vendido com sucesso', async function () {
    sinon.stub(salesModel, 'updateSales').resolves([updateSalesResponseOk]);

    const { status, data } = await salesService.updateSales(1, 1, { quantity: 777 });

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(updateSalesResponseOk);
  });

  afterEach(function () {
    sinon.restore();
  });
});