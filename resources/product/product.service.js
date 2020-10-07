
const mapper = require('object-mapper');
const repository = require('./product.repository');
const productProfile = require('./product.profile');
const productConstants = require('./product.constants');

const productService = {

    insertProduct: async function (productDto) {
        const { name, price, description } = productDto;
        if(!name || !price || !description){
            return Promise.reject(new Error(productConstants.Errors.MissingDetails));
        }

        await repository.insertProduct(name, price, description);
        return true;
    },

    getById: async function (id) {
        const product = await repository.getById(id).catch(e => {
            return Promise.reject(new Error(e.message));
        });
        return mapper(product, productProfile.productById);
    },

    getProductList: async function () {
        const products = await repository.getProductList();
        return mapper(products, productProfile.products);
    }
}

module.exports = productService;