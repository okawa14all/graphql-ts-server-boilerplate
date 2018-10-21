import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert
} from "typeorm";
import * as uuidv4 from "uuid/v4";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @BeforeInsert()
  assignId() {
    this.id = uuidv4();
  }
}
