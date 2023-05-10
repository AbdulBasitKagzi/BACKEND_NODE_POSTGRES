import express, { Express } from "express";
require("dotenv").config({ path: "./src/env-files/config.env" });
import dbConnection from "./db";

import { userRoute } from "./routes/user.routes";
import { brandRoute } from "./routes/brand.routes";
import { colorRoute } from "./routes/color.routes";
import { genderRoute } from "./routes/gender.routes";
import { sizeRoute } from "./routes/size.routes";
import { categoryRoute } from "./routes/category.routes";
import { productRoute } from "./routes/product.routes";
import { shippingDetailRoute } from "./routes/shippingDetail.routes";
import { paymentDetailRoute } from "./routes/PaymentDetail.routes";
import { productLikeRoute } from "./routes/productLike.routes";
import { cartRoute } from "./routes/cart.routes";
import { orderRoute } from "./routes/order.routes";

const cors = require("cors");

const app: Express = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(userRoute);
app.use(brandRoute);
app.use(colorRoute);
app.use(categoryRoute);
app.use(genderRoute);
app.use(sizeRoute);
app.use(productRoute);
app.use(shippingDetailRoute);
app.use(paymentDetailRoute);
app.use(productLikeRoute);
app.use(cartRoute);
app.use(orderRoute);

app.listen(port, () => {
  console.log("Server Started 🎉");
  dbConnection();
});
