const util = require('util');
const connection = require('../../connection');
const productConstants = require('./product.constants');
const queryPromise = util.promisify(connection.query).bind(connection);

const repository = {

    insertProduct: async function (name, price, description) {
        var sql = "INSERT INTO Products (Name, Price, Description) VALUES (\'" + name + "\', \'" + price + "\', \'" + description + "\')";
        await queryPromise(sql, []);
        return true;
    },

    getById: async function (id) {
        const products = await queryPromise('SELECT * FROM Products Where ID = ?', [id]);
        if (products.length == 0) {
            return Promise.reject(new Error(productConstants.Errors.ProductNotFound));
        }

        return products[0];
    },

    getProductList: async function () {
        const products = await queryPromise('SELECT * FROM Products', []);
        return products;
    }
}

module.exports = repository;