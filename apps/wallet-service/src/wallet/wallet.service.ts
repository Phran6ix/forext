import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Wallet } from "@forext/shared/entity"
import { Repository } from "typeorm";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateWalletPayload, CreditWalletBalancePayload, DebitWalletBalancePayload, GetUserWalletBalancePayload, ReturnEmpty, WalletServiceController } from "../../../../proto/wallet/wallet"
import { Observable } from "rxjs";
// import { UserDataPoint } from "@forext/data-access-user"

@Injectable()
export class WalletService implements WalletServiceController {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
    // private userDataPoint: UserDataPoint
  ) { }

  @GrpcMethod("WalletService", "createWallet")
  async createWallet(request: CreateWalletPayload): Promise<ReturnEmpty> {
    // const user = await this.userDataPoint.GetAUserById(request.userId)
    // if (!user) {
    //   throw new NotFoundException("User not found")
    // }

    const walletExist = await this.walletRepo.exists({
      where: {
        user: {
          userId: request.userId
        }
      }
    })

    if (walletExist) {
      throw new HttpException("User already has a wallet", HttpStatus.CONFLICT)
    }
    //
    const newWallet = new Wallet()
    // newWallet.user = user

    console.log("New wallet", newWallet)
    return {}
  }

  @GrpcMethod("WalletService", "debitwalletBalance")
  async debitwalletBalance(request: DebitWalletBalancePayload): Promise<ReturnEmpty | Observable<ReturnEmpty>> {
    const userWallet = await this.walletRepo.findOne({
      where: {
        user: {
          userId: request.userId
        },
        currency: request.currency
      }
    })

    if (!userWallet) {
      throw new NotFoundException("User wallet not found")
    }

    const currentWalletBalance = parseInt(userWallet.amount)

    if (currentWalletBalance <= +userWallet.amount) {
      throw new HttpException("Insufficient funds", HttpStatus.BAD_REQUEST)
    }

    const updatedWalletBalance = currentWalletBalance - parseInt(request.amount)

    // Create order and transaction entry
    await this.walletRepo.update({ walletId: userWallet.walletId }, { amount: `${updatedWalletBalance}` })
    return {}
  }
  @GrpcMethod("WalletService", "creditWalletBalance")
  async creditWalletBalance(request: CreditWalletBalancePayload): Promise<ReturnEmpty | Observable<ReturnEmpty>> {
    const userWallet = await this.walletRepo.findOne({
      where: {
        user: {
          userId: request.userId
        },
        currency: request.currency
      }
    })

    if (!userWallet) {
      throw new NotFoundException("User wallet not found")
    }

    const currentWalletBalance = parseInt(userWallet.amount)
    const updatedWalletBalance = currentWalletBalance + parseInt(request.amount)

    // Create order and transaction entry
    await this.walletRepo.update({ walletId: userWallet.walletId }, { amount: `${updatedWalletBalance}` })
    return {}
  }

  @GrpcMethod("WalletService", "gctUserWalletBalance")
  async getUserWalletBalance(request: GetUserWalletBalancePayload): Promise<ReturnEmpty | Promise<ReturnEmpty> | Observable<ReturnEmpty>> {
    const userWallet = await this.walletRepo.findOne({
      where: {
        user: {
          userId: request.userId
        }
      }
    })

    console.log(userWallet)
    return {}
  }
}
