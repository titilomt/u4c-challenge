import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Incidents } from "../incidents/incidents.entity";
import { Vehicules } from "../vehicules/vehicules.entity";

@Entity()
export class ThirdParty {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  document!: string;

  @Column()
  phone!: string;

  @Column({ unique: true })
  driverLicense!: string;

  @ManyToMany(() => Incidents, (incidents) => incidents.thirdParty)
  incidents!: Incidents[];

  @OneToMany(() => Vehicules, (vehicules) => vehicules.thirdParty)
  vehicules!: Vehicules[];
}
