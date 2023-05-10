import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OrderItems } from "./OrderItems";
import { User } from "./user.entities";
import { ShippingDetails } from "./ShippingDetails.entities";

@Entity()
export class OrderDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_amount: number;

  @OneToMany(() => OrderItems, (order) => order.orderDetail)
  orderItem: OrderItems[];

  @ManyToOne(() => User, (user) => user.orderDetail, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "user_id",
  })
  user: User | number;

  @ManyToOne(() => ShippingDetails, (shipping) => shipping.orderDetail)
  @JoinColumn({ name: "shipping_detail_id" })
  shipping: ShippingDetails | number;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}
