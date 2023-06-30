const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  findAllSalesResponseOk,
  findByIdSalesResponseOk,
  insertSalesResponseOk,
} = require('../../mocks/sales.mocks');

describe('Testes SALES CONTROLLERS', function () {
  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(salesService, 'findAllSales').resolves({
      status: 'SUCCESSFUL',
      data: findAllSalesResponseOk,
    });

    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findAllSalesResponseOk);
  });

  it('Recupera vendas por id com sucesso', async function () {
    sinon.stub(salesService, 'findByIdSales').resolves({
      status: 'SUCCESSFUL',
      data: findByIdSalesResponseOk,
    });

    const req = {
      params: { id: 2 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findByIdSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findByIdSalesResponseOk);
  });

  it('Insere vendas com sucesso', async function () {
    sinon.stub(salesService, 'insertSales').resolves({ status: 'CREATED', data: insertSalesResponseOk });

    const req = {
      params: {},
      body: [
        {
          productId: 1,
          quantity: 27,
        },
        {
          productId: 2,
          quantity: 27,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertSalesResponseOk);
  });
});