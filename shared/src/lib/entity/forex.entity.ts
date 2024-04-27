import { ObjectId } from "mongodb";
import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("Forex")
export class ForexEntity {
  @ObjectIdColumn()
  @PrimaryColumn()
  _id!: ObjectId

  @PrimaryColumn({ unique: true })
  forexId!: string

  @Column()
  name!: string

  @Column()
  price!: string

  @Column({ type: Date })
  priceFetchedAt!: Date

  @BeforeInsert()
  action?() {
    this.forexId = uuidv4()
  }
}
