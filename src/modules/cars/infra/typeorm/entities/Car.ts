import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Category from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export default Car;
