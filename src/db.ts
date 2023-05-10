// const Client = require("pg");
import { createConnection, DataSource } from "typeorm";
import { User } from "./entities/user.entities";
import { Brand } from "./entities/Brand.entities";
import { Color } from "./entities/Color.entities";
import { Category } from "./entities/Category.entities";
import { Size } from "./entities/size.entities";
import { Gender } from "./entities/Gender.entities";
import { Product } from "./entities/Product.entites";
import { ProductSize } from "./entities/product_size.entities";
import { productColors } from "./entities/product_color.entities";
import { ShippingDetails } from "./entities/ShippingDetails.entities";
import { PaymentDetail } from "./entities/userPaymentDetail.entities";
import { LikeProducts } from "./entities/LikeProduct.entities";
import { Cart } from "./entities/Cart.entities";
import { OrderItems } from "./entities/OrderItems";
import { OrderDetails } from "./entities/OrderDetails";

const dbConnection = async () => {
  try {
    return await createConnection({
      type: "postgres",
      port: 5432,
      host: "localhost",
      database: "e-commerce",
      username: "postgres",
      password: "abdulbasit",
      entities: [
        User,
        Brand,
        Color,
        Category,
        Size,
        Gender,
        Product,
        ProductSize,
        productColors,
        ShippingDetails,
        PaymentDetail,
        LikeProducts,
        Cart,
        OrderItems,
        OrderDetails,
      ],
      synchronize: true,
      logging: "all",
    });
  } catch (error) {
    console.log("error", error);
    console.log("Can't connect to database.😞");
    return;
  }
};

export default dbConnection;

// const AppDataSource = new DataSource({
//   type: "postgres",
//   port: 5432,
//   host: "localhost",
//   database: "e-commerce",
//   username: "postgres",
//   password: "abdulbasit",
//   entities: [User, Brand, Color, Category, Size, Gender, Product],
//   synchronize: true,
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log;
//     ("Data source has been initialised");
//   })
//   .catch((err) => {
//     console.log("Error connecting to database 😞");
//   });
