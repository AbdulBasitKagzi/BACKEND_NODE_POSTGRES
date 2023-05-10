import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./Product.entites";
import { Size } from "./size.entities";

@Entity()
export class ProductSize extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productSizes)
  @JoinColumn({ name: "product_id" })
  product: Product | number;

  @ManyToOne(() => Size, (size) => size.productSizes, { eager: true })
  @JoinColumn({ name: "size_id" })
  size: Size | number;
}
