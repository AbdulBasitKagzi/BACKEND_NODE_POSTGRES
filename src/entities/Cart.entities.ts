import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entities";
import { Product } from "./Product.entites";
import { Created_Deleted } from "./created.updated.date.entities";

export enum CartTypes {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  DELETE = "delete",
}

@Entity()
export class Cart extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  size: number;

  @Column()
  color: number;

  @Column({ nullable: true })
  total_amount: number;

  @ManyToOne(() => User, (user) => user.cart, {
    onDelete: "CASCADE",
    // eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User[] | number;

  @ManyToOne(() => Product, (product) => product.cart, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product[] | number;

  @DeleteDateColumn()
  deleted_At: Date;
}
