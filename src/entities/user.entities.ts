import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ShippingDetails } from "./ShippingDetails.entities";
import { PaymentDetail } from "./userPaymentDetail.entities";
import { LikeProducts } from "./LikeProduct.entities";
import { Cart } from "./Cart.entities";
import { OrderItems } from "./OrderItems";
import { OrderDetails } from "./OrderDetails";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class User extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column()
  password: string;

  // @ManyToOne(() => ShippingDetails, (shipping) => shipping.user)
  // @JoinColumn({ name: "user_id" })
  // shipping: ShippingDetails[];

  @OneToMany(() => ShippingDetails, (ship) => ship.user)
  shipping: ShippingDetails[];

  @OneToMany(() => PaymentDetail, (paymnet) => paymnet.User)
  UserPaymentDetail: PaymentDetail[];

  @OneToMany(() => LikeProducts, (product) => product.user)
  likeProduct: LikeProducts[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => OrderDetails, (order) => order.user)
  orderDetail: OrderDetails[];
}
