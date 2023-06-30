const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../../src/app');
const { salesController } = require('../../../src/controllers');
const { validateInsertSales } = require('../../../src/middlewares');

describe('Testa middlewares de validação de vendas inseridas', function () {
  it('Tenta inserir venda sem productId', async function () {
    const stubResponse = {
      status: 400,
      body: {
        message: '"productId" is required',
      },
    };

    sinon.stub(salesController, 'insertSales').resolves(stubResponse);

    const inputInsert = [{ quantity: 5 }];

    const response = await chai.request(app)
    .post('/sales')
    .send(inputInsert);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: '"productId" is required' });
  });

  it('Tenta inserir venda com productId inexistente', async function () {
    const stubResponse = {
      status: 404,
      body: {
        message: 'Product not found',
      },
    };

    sinon.stub(salesController, 'insertSales').resolves(stubResponse);

    const inputInsert = [
      {
        productId: 999,
        quantity: 5,
      },  
    ];

    const response = await chai.request(app)
    .post('/sales')
    .send(inputInsert);

    expect(response).to.have.status(404);
    expect(response.body).to.deep.equal({ message: 'Product not found' });
  });

  it('Tenta inserir uma venda sem a quantidade', async function () {
    this.timeout(5000);
    
    const stubResponse = {
      status: 400,
      body: { message: '"quantity" is required' },
    };

    sinon.stub(salesController, 'insertSales').resolves(stubResponse);

    const inputInsert = [
      {
        productId: 1,
      },
    ];

    const response = await chai.request(app)
    .post('/sales')
    .send(inputInsert);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Tenta inserir uma venda com quantidade 0', async function () {
    this.timeout(5000);
    
    const stubResponse = {
      status: 422,
      body: { message: '"quantity" must be greater than or equal to 1' },
    };

    sinon.stub(salesController, 'insertSales').resolves(stubResponse);

    const inputInsert = [
      {
        productId: 1,
        quantity: 0,
      },
    ];

    const response = await chai.request(app)
    .post('/sales')
    .send(inputInsert);

    expect(response).to.have.status(422);
    expect(response.body).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se o middleware de quantidade chama a função next', async function () {
    const nextSpy = sinon.spy();
  
    const req = {
      params: {},
      body: [
        {
          productId: 1,
          quantity: 1,
        },  
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateInsertSales.validateQuantity(req, res, nextSpy);
  
    sinon.assert.called(nextSpy);
  });

  afterEach(function () {
    sinon.restore();
  });
});