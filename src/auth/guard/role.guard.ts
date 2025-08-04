import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean  {
            const request = context.switchToHttp().getRequest()
            const user = request.user
            if(!user) return false
            const role = user.role
            if(role!=='admin') throw new UnauthorizedException('require role admin')
            return true
    }
}