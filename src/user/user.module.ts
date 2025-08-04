import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { LoggingInterceptor } from "src/logging/logging.interceptor";
import { LoggingModule } from "src/logging/logging.mdule";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),AuthModule,LoggingModule],
    controllers:[UserController],
    providers:[UserService,LoggingInterceptor],
    exports:[UserService]
})
export class UserModule {

}