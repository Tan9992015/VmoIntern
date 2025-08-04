import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/user/user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtServce:JwtService,
                private readonly configService:ConfigService
    ) {}

    async genarateToken(payload:Record<string,any>):Promise<any> {
        const refreshToken = await this.jwtServce.signAsync(payload)
        const accessToken = await this.jwtServce.signAsync(payload, {
            expiresIn:'100d',
            secret:this.configService.get('JWT_SECRET')
        })
        return {accessToken,refreshToken}
    }
}