import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entities";
import { Created_Deleted } from "./created.updated.date.entities";

@Entity()
export class PaymentDetail extends Created_Deleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  card_type: string;

  @Column()
  card_holder_name: string;

  @Column({ type: "numeric" })
  card_number: number;

  @Column()
  expiration: string;

  @Column()
  cvv: string;

  @ManyToOne(() => User, (user) => user.UserPaymentDetail)
  @JoinColumn({ name: "user_id" })
  User: User | number;
}
