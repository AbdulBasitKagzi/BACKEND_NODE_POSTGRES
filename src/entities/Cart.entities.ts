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

export enum CartTypes {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  DELETE = "delete",
}

@Entity()
export class Cart extends BaseEntity {
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

  @Column()
  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @DeleteDateColumn()
  deleted_At: Date;
}
