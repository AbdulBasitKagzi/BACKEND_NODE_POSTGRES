import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { productColors } from "./product_color.entities";
import { OrderItems } from "./OrderItems";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class Color extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hax_value: string;

  // @ManyToMany(() => Product, (product) => product.color)
  // product: Product;
  @OneToMany(() => productColors, (prod) => prod.color)
  productColors: productColors[];

  @OneToMany(() => OrderItems, (order) => order.color)
  orderItem: OrderItems[];
}
