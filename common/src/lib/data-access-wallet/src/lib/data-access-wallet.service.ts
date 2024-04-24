import { User, Wallet } from "@forext/shared/entity"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { UserDataPoint } from "@forext/data-access-user"

@Injectable()
export class WalletDataPoint {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
    private userDataPoint: UserDataPoint
  ) { }

  async GetUserWallet(userId: string): Promise<Wallet | null> {
    return this.walletRepo.findOne({
      where: {
        user: {
          userId
        }
      },
      relations: {
        user: true
      }
    })
  }

  async CreateANewWallet(userId: string): Promise<unknown> {
    const walletExist = await this.walletRepo.exists({
      where: {
        user: { userId }
      }
    })

    if (walletExist) {
      throw new HttpException("Wallet already exisit", HttpStatus.BAD_REQUEST)
    }
    const user = <User>await this.userDataPoint.GetAUserById(userId)

    const newWallet = new Wallet()
    newWallet.user = user
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
    return await this.walletRepo.update({ walletId }, { ...payload })
  }
}
