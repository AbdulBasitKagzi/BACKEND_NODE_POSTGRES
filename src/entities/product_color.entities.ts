import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product.entites";
import { Color } from "./Color.entities";

@Entity()
export class productColors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productColors)
  product: Product | number;

  @ManyToOne(() => Color, (prod) => prod.productColors)
  color: Color | number;
}
