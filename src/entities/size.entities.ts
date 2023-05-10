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

@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  // @ManyToMany(() => Product, (product: any) => product.sizes)
  // product: Product[];

  @OneToMany(() => ProductSize, (prod) => prod.size)
  productSizes: ProductSize[];

  @OneToMany(() => OrderItems, (order) => order.size)
  orderItem: OrderItems[];
}
