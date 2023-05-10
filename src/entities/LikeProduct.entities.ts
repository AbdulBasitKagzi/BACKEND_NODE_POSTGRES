import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entities";
import { Product } from "./Product.entites";

@Entity()
export class LikeProducts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likeProduct)
  @JoinColumn({ name: "user_id" })
  user: User | number;

  @ManyToOne(() => Product, (product) => product.likeProduct)
  @JoinColumn({ name: "product_id" })
  product: Product | number;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;
}
