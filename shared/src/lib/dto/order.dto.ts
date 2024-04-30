import { IsNotEmpty } from "class-validator"

export class CreateOrderDTO {
  @IsNotEmpty()
  asset!: string

  @IsNotEmpty()
  amount!: string
}
