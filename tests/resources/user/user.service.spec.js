const sinon = require("sinon");
const { expect } = require("chai");
const argon = require('argon2');
const jwt = require("jsonwebtoken");

const userConstants = require('../../../resources/user/user.constants');

const user = {
    Id: 1,
    Name: "TestUser",
    Password: "TestPassword",
    Description: "TestDescription",
};

describe('userService-SignUp', () => {

    afterEach(function () {
        sinon.restore();
    });

    it('signUp name is missing', () => {

        const service = require('../../../resources/user/user.service');

        service.signUp({})
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.MissingDetails);
            });
    });

    it('signUp password is missing', () => {

        const service = require('../../../resources/user/user.service');

        service.signUp({ name: 'testName' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.MissingDetails);
            });
    });

    it('signUp password2 is missing', () => {

        const service = require('../../../resources/user/user.service');

        service.signUp({ name: 'testName', password: 'testPassword' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.MissingDetails);
            });
    });

    it('signUp password not equal password2', () => {

        const service = require('../../../resources/user/user.service');

        service.signUp({ name: 'testName', password: 'testPassword', password2: 'testPassword2' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.PasswordNotMatching);
            });
    });

    it('signUp password not equal password2', () => {

        const service = require('../../../resources/user/user.service');

        service.signUp({ name: 'testName', password: 'testPassword', password2: 'testPassword2' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.PasswordNotMatching);
            });
    });

    it("signUp user already exists", () => {
        var userRepository = require('../../../resources/user/user.repository');
        var stub = sinon.stub(userRepository, 'getByName');
        stub.returns(Promise.resolve(user));
        const service = require('../../../resources/user/user.service');

        return service.signUp({ name: user.Name, password: 'testPassword', password2: 'testPassword' })
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.UserExists);
            });
    });

    it("signUp user created success", () => {
        var userRepository = require('../../../resources/user/user.repository');
        var stub = sinon.stub(userRepository, 'getByName');
        stub.returns(Promise.reject(new Error()));
        const service = require('../../../resources/user/user.service');

        return service.signUp({ name: user.Name, password: 'testPassword', password2: 'testPassword' })
            .then((data) => { expect(data).to.equal('User Created'); },);
    });

});

describe('userService-SignIn', () => {
    afterEach(function () {
        sinon.restore();
    });

    it('signIn user not found', () => {
        var userRepository = require('../../../resources/user/user.repository');
        var stub = sinon.stub(userRepository, 'getByName');
        stub.returns(Promise.reject(new Error(userConstants.Errors.UserNotFound)));

        const service = require('../../../resources/user/user.service');
        return service.login('userName', 'password')
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.UserNotFound);
            });
    })

    it('signIn password not matched', () => {
        var userRepository = require('../../../resources/user/user.repository');
        var repostub = sinon.stub(userRepository, 'getByName');
        repostub.returns(Promise.resolve(user));

        var argonStub = sinon.stub(argon, 'verify');
        argonStub.returns(Promise.resolve(false));

        const service = require('../../../resources/user/user.service');
        return service.login('userName', 'password')
            .then((data) => { }, (error) => {
                expect(error.message).to.equal(userConstants.Errors.IncorrectPassword);
            });
    })

    it('signIn success', () => {
        var userRepository = require('../../../resources/user/user.repository');
        var repostub = sinon.stub(userRepository, 'getByName');
        repostub.returns(Promise.resolve(user));

        var argonStub = sinon.stub(argon, 'verify');
        argonStub.returns(Promise.resolve(true));

        var jwtStub = sinon.stub(jwt, 'sign');
        jwtStub.returns('token');

        const service = require('../../../resources/user/user.service');
        return service.login('userName', 'password')
            .then((data) => { 
                expect(data.User.Name).to.equal(user.Name);
                expect(data.Token).to.equal('token');
            });
    })
})




