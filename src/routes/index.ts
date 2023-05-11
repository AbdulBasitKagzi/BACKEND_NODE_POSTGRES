import express, { Express } from "express";

import { brandRoute } from "./brand.routes";
import { cartRoute } from "./cart.routes";
import { categoryRoute } from "./category.routes";
import { colorRoute } from "./color.routes";
import { genderRoute } from "./gender.routes";
import { orderRoute } from "./order.routes";
import { paymentDetailRoute } from "./PaymentDetail.routes";
import { productRoute } from "./product.routes";
import { productLikeRoute } from "./productLike.routes";
import { shippingDetailRoute } from "./shippingDetail.routes";
import { sizeRoute } from "./size.routes";
import { userRoute } from "./user.routes";

const appRoute: Express = express();

appRoute.use(userRoute);
appRoute.use(brandRoute);
appRoute.use(colorRoute);
appRoute.use(categoryRoute);
appRoute.use(genderRoute);
appRoute.use(sizeRoute);
appRoute.use(productRoute);
appRoute.use(shippingDetailRoute);
appRoute.use(paymentDetailRoute);
appRoute.use(productLikeRoute);
appRoute.use(cartRoute);
appRoute.use(orderRoute);

export default appRoute;
