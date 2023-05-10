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

@Entity()
export class PaymentDetail extends BaseEntity {
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

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @ManyToOne(() => User, (user) => user.UserPaymentDetail)
  @JoinColumn({ name: "user_id" })
  User: User | number;
}
