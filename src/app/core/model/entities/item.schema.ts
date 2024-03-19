import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Item')
export class Item {
  @PrimaryGeneratedColumn()
  public Id!: number;

  @Column({ nullable: true })
  public Name!: string;

  @Column({ nullable: true })
  public Title!: string;
}


