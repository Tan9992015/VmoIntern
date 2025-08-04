import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtGuard } from "./guard/jwt.guard";
import { AuthService } from "./auth.service";
import { RoleGuard } from "./guard/role.guard";

@Module({
    imports:[
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService)=> (
                {
                   secret:configService.get('JWT_SECRET'),
                   signOptions:{
                    expiresIn:configService.get('JWT_EXPIRES_IN')
                   } 
                }
            ),
            inject:[ConfigService]
    })],
    providers:[JwtGuard,AuthService,RoleGuard,JwtModule],
    exports:[JwtGuard,AuthService,RoleGuard,JwtModule]
})
export class AuthModule {}