import { ClientProviderOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
export default (): ClientProviderOptions => ({
  name: "USER_PACKAGE",
  transport: Transport.GRPC,
  options: {
    package: "user",
    protoPath: join(__dirname, "proto/user/user.proto")
  }

})
