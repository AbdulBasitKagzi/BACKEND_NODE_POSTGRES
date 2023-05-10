import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Gender } from "./Gender.entities";
import { Category } from "./Category.entities";
import { Brand } from "./Brand.entities";
import { ProductSize } from "./product_size.entities";
import { productColors } from "./product_color.entities";
import { LikeProducts } from "./LikeProduct.entities";
import { Cart } from "./Cart.entities";
import { OrderItems } from "./OrderItems";
import { Size } from "./size.entities";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ nullable: true, name: "name" })
  productName: string;

  @Column({ nullable: true, type: "jsonb", name: "images" })
  productImages: {
    id: number;
    product_image: string;
  };

  @Column({ nullable: true, type: "simple-array", name: "description" })
  productDescription: string[];

  @Column({ nullable: true, name: "product_original_price" })
  productOriginalPrice: number;

  @Column({ nullable: true, name: "product_current_price" })
  productCurrentPrice: number;

  @Column({ nullable: true, name: "review_rate" })
  reviewRate: number;

  @Column()
  slug: string;

  @ManyToOne(() => Gender, (gender) => gender.product)
  @JoinColumn({ name: "gender_id" })
  gender: Gender;

  @ManyToOne(() => Category, (categroy) => categroy.product)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.product, { eager: true })
  @JoinColumn({ name: "brand_id" })
  brand: Brand;

  // @ManyToOne(() => Size, (size) => size.product)
  // @JoinColumn({ name: "sizes" })
  // proudct: Product | number[];

  //   @Column({ type: "simple-array" })
  //   size: number[];
  @OneToMany(() => ProductSize, (prod) => prod.product)
  productSizes: ProductSize[];

  @OneToMany(() => productColors, (prod) => prod.product)
  productColors: productColors[];

  @OneToMany(() => LikeProducts, (prod) => prod.product)
  likeProduct: LikeProducts[];

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @OneToMany(() => OrderItems, (order) => order.product)
  orderItem: OrderItems[];

  // @ManyToMany(() => Color, (color) => color.product)
  // @JoinTable()
  // color: Color[];
}
