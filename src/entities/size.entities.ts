import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import { Product } from "./Product.entites";
import { ProductSize } from "./product_size.entities";
import { OrderItems } from "./OrderItems";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class Size extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  slug: string;

  // @ManyToMany(() => Product, (product: any) => product.sizes)
  // product: Product[];

  @OneToMany(() => ProductSize, (prod) => prod.size)
  productSizes: ProductSize[];

  @OneToMany(() => OrderItems, (order) => order.size)
  orderItem: OrderItems[];
}
