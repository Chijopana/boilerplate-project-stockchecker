const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('Stock Price API', () => {
  it('should view one stock', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('stock');
        expect(res.body).to.have.property('price');
        done();
      });
  });

  it('should view one stock and like it', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('stock');
        expect(res.body).to.have.property('price');
        done();
      });
  });

  it('should view the same stock and like it again', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('stock');
        expect(res.body).to.have.property('price');
        done();
      });
  });

  it('should view two stocks', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['AAPL', 'GOOG'] })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.has.lengthOf(2);
        done();
      });
  });

  it('should view two stocks and like them', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['AAPL', 'GOOG'], like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.has.lengthOf(2);
        done();
      });
  });
});
