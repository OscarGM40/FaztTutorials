


/*  */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users'})
export class Users extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @Column({ type: 'varchar', length: 50 })
  email: string;
  
  @Column({ type: 'varchar', length: 255 })
  password: string;
  
}