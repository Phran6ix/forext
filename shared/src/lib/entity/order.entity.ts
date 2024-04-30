import { ObjectId } from "mongodb";
import { BeforeInsert, Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("Order")
export class OrderEntity {
  @ObjectIdColumn()
  _id!: ObjectId

  @PrimaryColumn({ unique: true })
  orderId!: string

  @Column({ type: String })
  userId!: string

  @Column({ type: String })
  asset!: string

  @Column({ type: Date })
  dateInitialized!: Date

  @Column({ type: String })
  amount!: string

  @Column({ type: String })
  currency!: string

  @Column({ type: Number })
  numberOfAsset!: number

  @Column({type: Boolean, default: false})
  orderProcessed!: boolean

  @BeforeInsert()
  action?() {
    this.orderId = uuidv4()
    this.orderProcessed = false
    this.dateInitialized= new Date()
  }
}
