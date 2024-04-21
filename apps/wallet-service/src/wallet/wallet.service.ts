import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Wallet } from "@forext/shared/entity"
import { Repository } from "typeorm";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateWalletPayload, CreditWalletBalancePayload, DebitWalletBalancePayload, GetUserWalletBalancePayload, ReturnEmpty, WalletServiceClient, WalletServiceController } from "../../../../proto/wallet/wallet"
import { Observable } from "rxjs";
import { UserDataPoint } from "@forext/data-access-user"

@Injectable()
export class WalletService implements WalletServiceController {
  constructor(
    @InjectRepository(Wallet)
    private walletRepo: Repository<Wallet>,
    private userDataPoint: UserDataPoint
  ) { }
  @GrpcMethod("WalletService", "createWallet")
  async createWallet(request: CreateWalletPayload): Promise<ReturnEmpty> {
    const user = await this.userDataPoint.GetAUserById(request.userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

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

    const newWallet = new Wallet()
    newWallet.user = user

    console.log("New wallet", newWallet)
    return {}
  }

  debitwallerBalance(request: DebitWalletBalancePayload): ReturnEmpty | Promise<ReturnEmpty> | Observable<ReturnEmpty> {
    throw new Error("Method not implemented.");
  }
  creditWalletBalance(request: CreditWalletBalancePayload): ReturnEmpty | Promise<ReturnEmpty> | Observable<ReturnEmpty> {
    throw new Error("Method not implemented.");
  }
  getUserWalletBalance(request: GetUserWalletBalancePayload): ReturnEmpty | Promise<ReturnEmpty> | Observable<ReturnEmpty> {
    throw new Error("Method not implemented.");
  }
}
