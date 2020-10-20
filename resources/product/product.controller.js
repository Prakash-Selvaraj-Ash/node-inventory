const productService = require("./product.service"),
    httpStatusCodes = require("http-status-codes");

const userController = {
    insertProduct: async (req, res) => {
        try {
            const response = await productService.insertProduct(req.body);
            return res.status(httpStatusCodes.OK).json(response);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    },

    getProductList: async (req, res) => {
        try {
            const products = await productService.getProductList()
            return res.status(httpStatusCodes.OK).json(products);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await productService.getById(req.params.id)
            return res.status(httpStatusCodes.OK).json(product);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    },

    deleteByIds: async (req, res) => {
        try {
            const result = await productService.deleteByIds(req.body)
            return res.status(httpStatusCodes.OK).json(result);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
};

module.exports = userController;
