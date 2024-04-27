import {Injectable} from "@nestjs/common"
import {DataAccessForexService} from "@forext/data-access-forex"
import {CreateOrderDTO} from "@forext/shared/dto"
import {CreateUserOrderResult} from "@forext/proto"
@Injectable()
export class OrderService{
  constructor(
    private forexDataAccess: DataAccessForexService
  ){}

  async CreateUserOrder(payload:CreateOrderDTO ):Promise<CreateUserOrderResult>{
    //Fetch user wallet
    //fetch asset details - price
    //if user has the amount
    //calculate the number of asset
    //if user has the asset wallet, credit it and deduct from usd
    //if if user does not have the wallet, create with the amount
    return
  }
}
