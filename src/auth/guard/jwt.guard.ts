import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService) {}
canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.replace('Bearer','').trim() ?? ''
        // phát hiện mới khoảng trắng ở token sau khi tách bearer có thể gây lỗi nên dùng trim
        console.log(token)
        if(!token) throw new UnauthorizedException('token not provied')
            
        try {
            const user =  this.jwtService.verify(token)
            // console.log(user)
            request.user = user
            return true
        } catch (error) {
            throw new UnauthorizedException('invalid token')
        }
    }
}