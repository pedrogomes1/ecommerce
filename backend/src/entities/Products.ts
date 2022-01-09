import { Column, Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';

@Entity("products")
class Products {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  price: number;
  
  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Products }
