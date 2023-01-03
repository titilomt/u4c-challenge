import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Incidents } from "../incidents/incidents.entity";
import { Vehicules } from "../vehicules/vehicules.entity";

@Entity()
export class Customers {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: true })
  birth!: Date;

  @Column({ unique: true })
  document!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  driverLicense!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Vehicules, (vehicules) => vehicules.customer, {
    cascade: true,
  })
  vehicules!: Vehicules[];

  @OneToMany(() => Incidents, (incidents) => incidents.customers, {
    cascade: true,
  })
  incidents!: Incidents[];
}
