const { expect } = require("chai");
const sinon = require("sinon");

describe('productRepository', () => {
    const product = {
        Id: 1,
        Name: "Name",
        Price: 20,
        Description: "Product description"
    };
    beforeEach(() => {
        
        var successConnectionObject = {
            connect: function (cb) {
                cb();
            },
            end: function () { },
            state: 'connected',
            query: function (query, value, cb) {
                cb(null, [product]);
            }
        }

        var testMysqlDriver = require('mysql');
        var stub = sinon.stub(testMysqlDriver, 'createConnection');
        stub.returns(successConnectionObject);
    })
    afterEach(() => { sinon.restore(); sinon.reset(); });

    it("getById", () => {
        const repository = require('../../../resources/product/product.repository');
        return repository.getById(1)
            .then((data) => {
                expect(data.Name).to.equal(product.Name)
                expect(data.Description).to.equal(product.Description)
            });
    });

    it("getProductList", () => {
        const repository = require('../../../resources/product/product.repository');
        return repository.getProductList()
            .then((data) => {
                expect(data.length).to.equal(1)
                expect(data[0].Name).to.equal(product.Name)
                expect(data[0].Description).to.equal(product.Description)
            });
    });


    it("insertProduct", () => {
        const repository = require('../../../resources/product/product.repository');
        return repository.insertProduct('newproduct', 20, 'newProductDescription')
            .then((data) => {
                expect(data).to.equal(true);
            });
    });

});




