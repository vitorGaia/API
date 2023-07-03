const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

const { getFormattedUpdateColumns } = require('../../../src/utils/getFormattedQuery');

describe('Testes getFormattedQuery', function () {
  it('Mapeia colunas para atualização com sucesso', function () {
    const response = getFormattedUpdateColumns({ name: 'Jhonsons', id: 3 });

    expect(response).to.be.equal('name = ?, id = ?');
  });
});