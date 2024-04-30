import { Wallet } from "@forext/shared/entity"
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class WalletDataPoint {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
  ) { }

  async GetAllUsersWallet(userId: string): Promise<Wallet[]> {
    return this.walletRepo.find({
      where: {
        userId
      }
    })
  }
  async GetUserWallet(userId: string, currency = "NGN"): Promise<Wallet | null> {
    // const _id = ObjectId(userId)
    return this.walletRepo.findOne({
      where: {
        userId
      },
      // relations: {
      //   user: true
      // }
    })
  }

  async CreateANewWallet(userId: string, currency = "NGN", metaData?: Partial<Wallet>): Promise<Wallet> {
    // const _id = new ObjectId(userId)
    const walletExist = await this.walletRepo.findOne({
      where: {
        userId
      }
    })

    const newWallet = new Wallet()
    newWallet.userId = userId
    newWallet.currency = currency
    newWallet.amount = metaData.amount || "0.00"
    return await this.walletRepo.save(newWallet)
  }

  async GetWalletByWalletId(walletId: string): Promise<Wallet | null> {
    return this.walletRepo.findOne({
      where: {
        walletId
      }
    })
  }

  async UpdateAWalletData(walletId: string, payload: Partial<Wallet>): Promise<unknown> {
    // const _id = new ObjectId(walletId)
    return await this.walletRepo.update({ walletId }, { ...payload })
  }
}
