import { AUTH_PACKAGE_NAME } from "@forext/proto";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
console.log(__dirname)
const authOptions: ClientProviderOptions = {
  name: AUTH_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: "0.0.0.0:6002",
    package: "auth",
    protoPath: join(__dirname, "../../../proto/auth/auth.proto")
  }
}

export default authOptions
