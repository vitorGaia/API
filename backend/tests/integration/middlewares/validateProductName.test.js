const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../../src/app');
const { productsController } = require('../../../src/controllers');
const middlewares = require('../../../src/middlewares');

describe('Testa o middleware de validação do nome', function () {
  it('Tenta inserir un nome menor que 5 chars no db', async function () {
    this.timeout(5000);
    
    const stubResponse = {
      status: 422,
      body: { message: '"name" length must be at least 5 characters long' },
    };

    sinon.stub(productsController, 'insertProducts').resolves(stubResponse);

    const inputInsert = { name: 'Capa' };

    const response = await chai.request(app)
    .post('/products')
    .send(inputInsert);

    expect(response).to.have.status(422);
    expect(response.body).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Tenta inserir sem nome no db', async function () {
    this.timeout(5000);

    const stubResponse = {
      status: 400,
      body: { message: '"name" is required' },
    };

    sinon.stub(productsController, 'insertProducts').resolves(stubResponse);

    const inputInsert = { name: undefined };

    const response = await chai.request(app)
    .post('/products')
    .send(inputInsert);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: '"name" is required' });
  });

  it('Testa se o middleware chama a função next', async function () {
    const nextSpy = sinon.spy();
  
    const req = {
      params: {},
      body: { name: 'Capacete do Pacificador' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    middlewares.validateProductName(req, res, nextSpy);
  
    sinon.assert.called(nextSpy);
  });

  afterEach(function () {
    sinon.restore();
  });
});