import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Size } from "./size.entities";
import { Color } from "./Color.entities";
import { Product } from "./Product.entites";
import { User } from "./user.entities";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class OrderItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @Column()
  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => Size, (size) => size.orderItem, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "size",
  })
  size: Size | number;

  @ManyToOne(() => Color, (color) => color.orderItem, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "color",
  })
  color: Color | number;

  @ManyToOne(() => Product, (product) => product.orderItem, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product[] | number;

  @ManyToOne(() => OrderDetails, (order) => order.orderItem)
  @JoinColumn({ name: "order_detail_id" })
  orderDetail: OrderDetails | number;
}
