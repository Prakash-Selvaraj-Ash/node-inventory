const util = require('util');
const connection = require('../../connection');
const userConstants = require('./user.constants');
const queryPromise = util.promisify(connection.query).bind(connection);

const repository = {
    getByName: async function (name) {
        connection.query('', [], (err, res) => {});
        const userRecords = await queryPromise('SELECT * FROM Users Where NAME = ?', [name]);
        if (userRecords.length == 0) {
            return Promise.reject(new Error(userConstants.Errors.UserNotFound));
        }

        return userRecords[0];
    },

    insertUser: async function (name, passwordHashed) {
        var sql = "INSERT INTO Users (Name, Password) VALUES (\'" + name + "\', \'" + passwordHashed + "\')";
        await queryPromise(sql, []);
        return true;
    },

    getById: async function (id) {
        const userRecords = await queryPromise('SELECT * FROM Users Where ID = ?', [id]);
        if (userRecords.length == 0) {
            return Promise.reject(new Error(userConstants.Errors.UserNotFound));
        }

        return userRecords[0];
    }
}

module.exports = repository;