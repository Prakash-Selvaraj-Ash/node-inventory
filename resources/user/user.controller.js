const userService = require("./user.service"),
    httpStatusCodes = require("http-status-codes");

const userController = {
    signUp: async (req, res) => {
        try {
            const registeredUser = await userService.signUp(req.body);
            return res.status(httpStatusCodes.OK).json(registeredUser);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const loggedInUser = await userService.login(
                req.body.name,
                req.body.password
            );
            return res.status(httpStatusCodes.OK).json(loggedInUser);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await userService.getUser(
                req.params.id,
            );
            return res.status(httpStatusCodes.OK).json(user);
        } catch (err) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
};

module.exports = userController;
