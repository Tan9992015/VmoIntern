import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggingEntity } from "./logging.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoggingService {
    constructor(@InjectRepository(LoggingEntity) 
                private readonly loggingRepository:Repository<LoggingEntity>) {}
    async logToDB(data:any):Promise<void> {
       let loggingEntity = new LoggingEntity()
       loggingEntity.method = data.method ?? ''
       loggingEntity.userEmail = data.userEmail ?? ''
       loggingEntity.status = data.status ?? 500
       loggingEntity.url = data.url ?? ''
       loggingEntity.timeStamp = data.timeStamp ?? new Date()
    
       await this.loggingRepository.save(loggingEntity)

    }
}