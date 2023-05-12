import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entities";
import { OrderDetails } from "./OrderDetails";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class ShippingDetails extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ type: "numeric" })
  phone_number: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  zip_code: string;

  @ManyToOne(() => User, (user) => user.shipping)
  @JoinColumn({ name: "user_id" })
  user: User | number;

  @OneToMany(() => OrderDetails, (order) => order.shipping)
  orderDetail: OrderDetails[];
}
