import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { WalletDataPoint } from "@forext/data-access-wallet"
import { CreateOrderDTO } from "@forext/shared/dto"
import { CreateUserOrderResult, RATE_PACKAGE_NAME, RATE_SERVICE_NAME, RateServiceClient } from "@forext/proto"
import { ClientGrpc, RpcException } from "@nestjs/microservices"
import { OrderDataPoint } from "@forext/data-access-order"
import { firstValueFrom } from "rxjs"
import { Order } from "@forext/shared/entity"
@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    private walletDataAccess: WalletDataPoint,
    @Inject(RATE_PACKAGE_NAME) private rateClient: ClientGrpc,
    private orderDataaPoint: OrderDataPoint

  ) { }
  private rateService: RateServiceClient
  onModuleInit() {
    this.rateService = this.rateClient.getService<RateServiceClient>(RATE_SERVICE_NAME)
  }

  async CreateUserOrder(userId: string, payload: CreateOrderDTO): Promise<CreateUserOrderResult> {
    let userWallet = await this.walletDataAccess.GetAllUsersWallet(userId)
    //Fetch user wallet
    //fetch asset details - price
    let NGNWallet = userWallet.find((wallet) => wallet.currency == "NGN")
    let { conversionRate } = await firstValueFrom(this.rateService.getUsdRates({}))

    const price = conversionRate[payload.asset]
    //if user has the amount
    if (NGNWallet.amount <= payload.amount) {
      new RpcException(new HttpException("Insufficient funds ", HttpStatus.BAD_REQUEST))
    }
    //calculate the number of asset
    const numberOfAsset = parseFloat(payload.amount) / parseFloat(price)
    console.log(numberOfAsset)
    //if user has the asset wallet, credit it and deduct from usd
    let assetWallet = userWallet.find(wallet => wallet.currency == payload.asset)

    if (!assetWallet) {
      assetWallet = await this.walletDataAccess.CreateANewWallet(userId, payload.asset, { amount: "" + numberOfAsset })
    } else {
      //if if user does not have the wallet, create with the amount
      let assetAdded = +assetWallet.amount + numberOfAsset
      this.walletDataAccess.UpdateAWalletData(assetWallet.walletId, { amount: '' + assetAdded })
    }

    const updatedWalletAmount = parseFloat(NGNWallet.amount) - parseFloat(payload.amount)
    console.log(updatedWalletAmount)
    this.walletDataAccess.UpdateAWalletData(NGNWallet.walletId, { amount: updatedWalletAmount + '' })
    const order = await this.orderDataaPoint.CreateOrder({
      asset: payload.asset,
      amount: payload.amount,
      numberOfAsset,
      currency: payload.asset,
      userId,

    })
    return {
      userId,
      orderProcessed: order.orderProcessed,
      numberOfAsset,
      dateInitialized: ('' + order.dateInitialized),
      orderId: order.orderId
    }
  }

  async GetUserOrders(userId: string): Promise<{ orders: Order[] }> {
    const orders = await this.orderDataaPoint.GetOrders({ userId })
    return { orders }
  }

}
