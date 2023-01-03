import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Customers } from "../customers/customers.entity";
import { ThirdParty } from "../third-party/third-party.entity";
import { Vehicules } from "../vehicules/vehicules.entity";

@Entity()
export class Incidents {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  date!: Date;

  @Column()
  address!: string;

  @Column()
  customerDocument!: string;

  @Column({ unique: true })
  policeReport!: string;

  @Column({ type: "jsonb", nullable: true })
  vehiculesInvolved!: Vehicules[];

  @ManyToOne(() => Customers, (customers) => customers.incidents)
  customers!: Customers;

  @ManyToMany(() => ThirdParty, (thirdParty) => thirdParty.incidents)
  @JoinTable()
  thirdParty!: ThirdParty[];
}
