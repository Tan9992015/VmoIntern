import { Module } from "@nestjs/common"
import { LoggingService } from "./logging.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LoggingEntity } from "./logging.entity"
import { ApiTags } from "@nestjs/swagger"

@ApiTags('logging')
@Module({
    imports:[TypeOrmModule.forFeature([LoggingEntity])],
    providers:[LoggingService],
    exports:[LoggingService]
})
export class LoggingModule {}