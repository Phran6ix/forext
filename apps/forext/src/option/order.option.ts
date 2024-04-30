import { ORDER_PACKAGE_NAME } from "@forext/proto";
import { ClientProvider, ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

const optionOption: ClientProviderOptions = {
  transport: Transport.GRPC,
  name: ORDER_PACKAGE_NAME,
  options: {
    protoPath: join(__dirname, "../../../proto/order/order.proto"),
    url: "0.0.0.0:6006",
    package: ORDER_PACKAGE_NAME
  }
}

export default optionOption
