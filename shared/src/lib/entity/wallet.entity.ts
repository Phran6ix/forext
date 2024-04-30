import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { v4 as uuidV4 } from "uuid"

@Entity("Wallet")
export class Wallet {
  @ObjectIdColumn({ name: "_id" })
  _id!: ObjectId

  @PrimaryColumn()
  @PrimaryGeneratedColumn("uuid")
  walletId!: string

  @Column({ type: String, nullable: false })
  amount!: string

  @Column({ type: String, default: "NGN" })
  currency!: string

  @Column({ type: String })
  @PrimaryColumn()
  userId!: string

  @BeforeInsert()
  assignId?() {
    this.walletId = uuidV4()
  }

}
