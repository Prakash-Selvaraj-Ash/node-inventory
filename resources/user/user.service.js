
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userProfile = require('./user.profile');
const mapper = require('object-mapper');
const repository = require('./user.repository');
const userConstants = require('./user.constants');

const service = {
    signUp: async function (userObj) {
        const { name, password, password2 } = userObj;
        if (!name || !password || !password2) {
            return Promise.reject(new Error(userConstants.Errors.MissingDetails));
        }
        if (password !== password2) {
            return Promise.reject(new Error(userConstants.Errors.PasswordNotMatching));
        }

        const userRecord = await repository.getByName(name).catch((e) => {});
        
        if (userRecord) {
            return Promise.reject(new Error(userConstants.Errors.UserExists));
        }

        const salt = crypto.randomBytes(32);

        const passwordHashed = await argon2.hash(password, { salt });
        await repository.insertUser(name, passwordHashed);


        return 'User Created';
    },

    login: async (name, password) => {

        const userRecord = await repository.getByName(name).catch((e) => {
            return Promise.reject(new Error(e.message));
        });

        const correctPassword = await argon2.verify(
            userRecord.Password,
            password
        );
        if (!correctPassword) {
            return Promise.reject(new Error(userConstants.Errors.IncorrectPassword));
        }

        return {
            User: {
                Name: userRecord.Name,
                Id: userRecord.Id
            },
            Token: generateToken(userRecord),
        };

    },

    getUser: async function (id) {
        const userRecord = await repository.getById(id).catch(e => {
            return Promise.reject(e);
        });
        return mapper(userRecord, userProfile.userById);
    }
}

function generateToken(user) {
    const data = {
        id: user.id,
        name: user.name,
    };
    const signature = "inventory";
    const expiration = "6h";

    return jwt.sign({ data }, signature, { expiresIn: expiration });
}


module.exports = service;



