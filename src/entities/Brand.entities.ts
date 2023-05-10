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

@Entity()
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  slug: string;

  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}
