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

@Entity()
export class Color extends BaseEntity {
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

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}
