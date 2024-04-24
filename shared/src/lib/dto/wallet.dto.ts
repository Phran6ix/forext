import { IsNotEmpty } from 'class-validator'

export class CreateWalletDTO {
  @IsNotEmpty()
  userId!: string
}

export class UpdateWalletDTO {
  @IsNotEmpty()
  userId!: string

  @IsNotEmpty()
  currency!: string

  @IsNotEmpty()
  amount!: string
}

export class GetUserWalletDTO {
  @IsNotEmpty()
  userId!: string
}
