const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../stage2');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Customers API', () => {
    describe('POST /customers', () => {
        it('should create a new customer', (done) => {
            chai.request(server)
                .post('/customers')
                .send({
                    name: 'Iruene Siki',
                    address: '123 Street St',
                    age: 19
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal('Iruene Siki');
                    done();
                }
                );
        });
    });

    describe('GET /customers', () => {
        it('should get all customers', (done) => {
            chai.request(server)
                .get('/customers')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                }
                );
        });
    });

    describe('GET /customers/:id', () => {
        it('should get a single customer', (done) => {
            const customerId = 14;
            chai.request(server)
                .get(`/customers/${customerId}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                }
                );
        });
    });

    describe('PUT /customers/:id', () => {
        it('should update a customer', (done) => {
            const customerId = 14;
            chai.request(server)
                .put(`/customers/${customerId}`)
                .send({
                    name: 'Meruwoma Zeal',
                    address: '123 Street St',
                    age: 20
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                }
                );
        });
    });

    // if the test is failing change the customerID, increment it by 1
    describe('DELETE /customers/:id', () => {
        it('should delete a customer', (done) => {
            const customerId = 16;
            chai.request(server)
                .delete(`/customers/${customerId}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                }
                );
        });
    });

});

