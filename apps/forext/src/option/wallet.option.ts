
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { WALLET_PACKAGE_NAME } from "proto/wallet/wallet";

const walletOption: ClientProviderOptions = {
  transport: Transport.GRPC,
  name: WALLET_PACKAGE_NAME,
  options: {
    url: "0.0.0.0:6003",
    protoPath: join(__dirname, "../../../proto/wallet/wallet.proto"),
    package: WALLET_PACKAGE_NAME,
  }
}

export default walletOption
