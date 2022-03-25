import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AppStatusCode } from "../domain/enum/app-status-code";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  private readonly TOKEN_NAME: string = "Bearer";

  constructor(
    private jwtService: JwtService
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const tokenName = authHeader.split(" ")[0];
      const tokenValue = authHeader.split(" ")[1];

      if (tokenName !== this.TOKEN_NAME && !tokenValue) {
        return false;
      }

      request.user = this.jwtService.verify(tokenValue);

      return true;
    } catch (exception) {
      console.log(exception);
      throw new UnauthorizedException(AppStatusCode.UNAUTHORIZED);
    }
  }

}