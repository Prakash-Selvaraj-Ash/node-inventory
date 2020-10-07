require('./connection');
const cors = require("cors");
const express = require("express");
const authMiddleWare = require('./middlewares/auth.middleware');

const app = express();

const userRoute = require("./resources/user/user.route");
const productRoute = require('./resources/product/product.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/v1", userRoute);
app.use("/api/products/v1", [authMiddleWare], productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is listening at port ${PORT}`));
