const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const mapStatusHTTP = require('../../../src/utils/mapStatusHTTP');

describe('Testes MapStatusHTTP', function () {
  it('Mapeia status com sucesso', function () {
    const response = mapStatusHTTP('SUCCESSFUL');

    expect(response).to.be.equal(200);
  });

  it('Mapeia status sem sucesso', function () {
    const response = mapStatusHTTP('LAULAU');

    expect(response).to.be.equal(500);
  });
});