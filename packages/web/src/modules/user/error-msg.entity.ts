import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ErrorMsg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  msg: string;

  @Column()
  url: string;

  @Column()
  column: number;

  @Column()
  row: number;
}
