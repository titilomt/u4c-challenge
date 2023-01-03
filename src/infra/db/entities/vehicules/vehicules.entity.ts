import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customers } from "../customers/customers.entity";

@Entity()
export class Vehicules {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column()
  year!: string;

  @Column()
  plate!: string;

  @Column()
  brand!: string;

  @Column({ unique: true })
  chassis!: string;

  @ManyToOne(() => Customers, (customer) => customer.vehicules)
  customer!: Customers;
}
