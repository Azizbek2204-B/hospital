import {  CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtSelfGuard implements CanActivate {

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    
    if (req.user.is_active == false) {
        throw new ForbiddenException({
            massage:"Block qilingan foydalanuvchi"
        })
    }
    return true;
  }
}