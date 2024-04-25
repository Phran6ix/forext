import { Wallet } from "@forext/shared/entity"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class WalletDataPoint {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
  ) { }

  async GetUserWallet(userId: string): Promise<Wallet | null> {
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

  async CreateANewWallet(userId: string): Promise<unknown> {
    console.log("Crete wallet called")
    // const _id = new ObjectId(userId)
    const walletExist = await this.walletRepo.findOne({
      where: {
        userId
      }
    })

    console.log(userId)
    console.log("Crete wallet called")
    console.log(walletExist)
    // if (walletExist) {
    //   throw new HttpException("Wallet already exisit", HttpStatus.BAD_REQUEST)
    // }
    console.log("over her")

    const newWallet = new Wallet()
    newWallet.userId = userId
    await this.walletRepo.save(newWallet)
    return
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
