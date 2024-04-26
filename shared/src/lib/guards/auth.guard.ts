import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {

  // @Client({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: AUTH_PACKAGE_NAME,
  //     protoPath: join(__dirname, "../../../proto/auth/auth.proto")
  //   }
  // })
  // client!: ClientGrpc;
  //
  // private authService!: AuthServiceClient
  // onModuleInit() {
  //   this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  // }

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const authorizationHeader = request.headers['authorization']

    if (!authorizationHeader) {
      throw new RpcException(new HttpException("You are not logged in", 401))
    }

    const token = authorizationHeader.split(" ")[1]
    if (!token) {
      throw new RpcException(new HttpException("Invalid token", 401))
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_SECRET")
      })
      request['user'] = payload.id
      return true
    } catch (error) {
      console.error("KSKSK", error)
      throw new RpcException(new UnauthorizedException())
    }


  }
}
