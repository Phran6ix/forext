import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryColumn()
  @PrimaryGeneratedColumn("uuid")
  userId!: string;

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

  @Column({ type: Date, default: new Date() })
  createdAt!: Date

}
