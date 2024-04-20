import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("Wallet")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  walletId!: string

  @Column({ type: String, nullable: false })
  amount!: string

  @Column({ type: String, default: "NGN" })
  currency!: string

  @Column(() => User)
  @JoinColumn()
  user!: User
}
