import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product.entites";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class Brand extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  slug: string;

  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];
}
