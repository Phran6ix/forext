import { RATE_PACKAGE_NAME, RATE_SERVICE_NAME } from "@forext/proto";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { join } from "path";


const rateOption: ClientProviderOptions = {
  name: RATE_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: "0.0.0.0:6005",
    protoPath: join(__dirname, "../../../proto/rate/rate.proto"),
    package: RATE_PACKAGE_NAME
  }
}

export default rateOption
