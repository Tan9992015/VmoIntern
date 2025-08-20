import { forwardRef, Module } from "@nestjs/common"
import { LoggingService } from "./logging.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LoggingEntity } from "./logging.entity"
import { ApiTags } from "@nestjs/swagger"
import { UserModule } from "src/user/user.module"
import { LoggingController } from "./logging.controller"

@ApiTags('logging')
@Module({
    imports:[TypeOrmModule.forFeature([LoggingEntity])],
    controllers:[LoggingController],
    providers:[LoggingService],
    exports:[LoggingService]
})
export class LoggingModule {}