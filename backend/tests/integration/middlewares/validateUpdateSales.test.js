const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../../src/app');
const { salesController } = require('../../../src/controllers');
const { validateUpdateSales } = require('../../../src/middlewares');

describe('Testa middleware de validação de atualização de venda', function () {
  it('Tenta atualizar uma venda sem a quantidade', async function () {
    this.timeout(5000);
    
    const stubResponse = {
      status: 400,
      body: { message: '"quantity" is required' },
    };

    sinon.stub(salesController, 'updateSales').resolves(stubResponse);

    const response = await chai.request(app)
    .put('/sales/1/products/1/quantity')
    .send(undefined);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Tenta atualizar uma venda com quantidade 0', async function () {
    this.timeout(5000);
    
    const stubResponse = {
      status: 422,
      body: { message: '"quantity" must be greater than or equal to 1' },
    };

    sinon.stub(salesController, 'updateSales').resolves(stubResponse);

    const inputInsert = { quantity: 0 };

    const response = await chai.request(app)
    .put('/sales/1/products/1/quantity')
    .send(inputInsert);

    expect(response).to.have.status(422);
    expect(response.body).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se o middleware de quantidade chama a função next', async function () {
    const nextSpy = sinon.spy();
  
    const req = {
      params: {},
      body: { quantity: 777 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateUpdateSales.validateQuantity(req, res, nextSpy);
  
    sinon.assert.called(nextSpy);
  });

  afterEach(function () {
    sinon.restore();
  });
});