import { IsNotEmpty } from "class-validator"

export class CreateOrderDTO {
  @IsNotEmpty()
  forexId!: string

  @IsNotEmpty()
  asset!: string

  @IsNotEmpty()
  amount!: string
}
