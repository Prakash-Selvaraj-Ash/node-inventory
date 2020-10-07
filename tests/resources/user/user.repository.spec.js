const { expect } = require("chai");
const sinon = require("sinon");

describe('userRepository', () => {
    const user = {
        Id: 1,
        Name: "Name",
        Password: "TestPassword",
    };
    afterEach(() => { sinon.restore(); sinon.reset(); });
    beforeEach(() => {
        
        var connectionState = {
            connect: function (cb) {
                cb();
            },
            end: function () { },
            state: 'connected',
            query: function (query, value, cb) {
                cb(null, [user]);
            }
        }

        var testMysqlDriver = require('mysql');
        var stub = sinon.stub(testMysqlDriver, 'createConnection');
        stub.returns(connectionState);

    })


    it("getById", () => {
        const repository = require('../../../resources/user/user.repository');
        return repository.getById(1)
            .then((data) => {
                expect(data.Name).to.equal(user.Name)
            });
    });

    it("getByName", () => {
        const repository = require('../../../resources/user/user.repository');
        return repository.getByName(user.Name)
            .then((data) => {
                expect(data.Name).to.equal(user.Name)
            });
    });


    it("insertUser", () => {
        const repository = require('../../../resources/user/user.repository');
        return repository.insertUser('newUser', 'newPassword')
            .then((data) => {
                expect(data).to.equal(true);
            });
    });

});




