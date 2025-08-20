import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggingEntity } from "./logging.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class LoggingService {
    constructor(@InjectRepository(LoggingEntity) 
                private readonly loggingRepository:Repository<LoggingEntity>,
            ) {}
    async logToDB(data:any):Promise<void> {
       let loggingEntity = new LoggingEntity()
       loggingEntity.method = data.method ?? ''
       loggingEntity.userEmail = data.userEmail ?? ''
       loggingEntity.status = data.status ?? 500
       loggingEntity.url = data.url ?? ''
       loggingEntity.userId = data.userId ?? ''
       loggingEntity.timeStamp = data.timeStamp ?? new Date()
    
       await this.loggingRepository.save(loggingEntity)

    }

    // async getUserLoggingHistory(userId:string) {
    //     try {
    //         const foundUser = await this.userService.findOneById(userId)
    //         if(foundUser.err===1) return {
    //             err:1,
    //             mess:'user not found'
    //         }
    //         return {
    //             err:0,
    //             mess:'user logging history',
    //             data: await this.loggingRepository.find({where: {userId:userId}})
    //         }
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}