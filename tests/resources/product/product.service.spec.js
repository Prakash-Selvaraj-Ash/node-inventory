const sinon = require("sinon");
const { expect } = require("chai");
const productConstants = require('../../../resources/product/product.constants');
const { products } = require("../../../resources/product/product.profile");

const product = {
    Id: 1,
    Name: "Testproduct",
    Price: 20,
    Description: "TestDescription",
};

describe('productService-insertProduct', () => {

    afterEach(function () {
        sinon.restore();
    });

    it('insertProduct name is missing', () => {

        const service = require('../../../resources/product/product.service');

        service.insertProduct({})
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(productConstants.Errors.MissingDetails);
            });
    });

    it('insertProduct price is missing', () => {

        const service = require('../../../resources/product/product.service');

        service.insertProduct({ name: 'testName' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(productConstants.Errors.MissingDetails);
            });
    });

    it('insertProduct description is missing', () => {

        const service = require('../../../resources/product/product.service');

        service.insertProduct({ name: 'testName', price: 20 })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(productConstants.Errors.MissingDetails);
            });
    });

    it('insertProduct password not equal password2', () => {

        const service = require('../../../resources/product/product.service');

        service.insertProduct({ name: 'testName', price: 20, description: 'desc' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(productConstants.Errors.PasswordNotMatching);
            });
    });

    it("insertProduct product created success", () => {

        const service = require('../../../resources/product/product.service');

        return service.insertProduct({ name: 'testName', price: 20, description: 'desc' })
            .then((data) => { expect(data).to.equal(true); },);
    });

});

describe('productService-SignIn', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('getById', () => {
        var productRepository = require('../../../resources/product/product.repository');
        var stub = sinon.stub(productRepository, 'getById');
        stub.returns(Promise.resolve(product));

        const service = require('../../../resources/product/product.service');
        return service.getById(1)
            .then((data) => { expect(data.Name).to.equal(product.Name) });
    })

    it('getList', () => {
        var productRepository = require('../../../resources/product/product.repository');
        var repostub = sinon.stub(productRepository, 'getProductList');
        repostub.returns(Promise.resolve([product]));

        const service = require('../../../resources/product/product.service');
        return service.getProductList()
            .then((data) => {
                expect(data.length).to.equal(1)
                expect(data[0].Name).to.equal(product.Name)
            });
    })
})




