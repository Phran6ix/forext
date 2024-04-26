import { ObjectId } from "mongodb";
import { Entity, Column, PrimaryColumn, BeforeInsert, ObjectIdColumn } from "typeorm";

import { v4 as uuidV4 } from "uuid"

@Entity("User")
export class User {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column({ unique: true })
  userId!: string

  @Column({ type: String })
  firstname!: string

  @Column({ type: String })
  lastname!: string

  @Column({ type: String, unique: true })
  username!: string

  @Column({ type: String, unique: true })
  email!: string

  @Column({ type: String })
  password!: string

  @Column({ type: Date, nullable: true })
  deletedAt!: Date

  @Column({ type: Date })
  createdAt!: Date

  @BeforeInsert()
  beforeInsertAction?() {
    this.createdAt = new Date()
    this.userId = uuidV4()
  }
}
