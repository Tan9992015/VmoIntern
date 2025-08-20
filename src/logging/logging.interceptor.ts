import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { LoggingService } from "./logging.service";
import { lastValueFrom, of } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector:Reflector,
        private loggingService:LoggingService
    ) {}

    async intercept(context:ExecutionContext, next:CallHandler):Promise<any> {
        const handler = context.getHandler() //get method 
        const isLoggable = this.reflector.get<boolean>('loggable',handler) // 2 tham số là key với nơi gắn metadata

        if(!isLoggable) return await lastValueFrom(of(await next.handle())) // next handle trả về observable (gọi controller tương ứng), lastvalue chuyển obsevable thành promise

        const request = context.switchToHttp().getRequest()
        const { method,url,user } = request
    
        const userEmail= user?.email ?? 'not exist'
        const userId = user?.id ?? 'not exist'
        try {
           const result = await lastValueFrom(of(await next.handle()))
           const log = await this.loggingService.logToDB({
                method:method,
                url:url,
                userEmail:userEmail,
                userId:userId,
                timeStamp: new Date().toISOString(),
                status: context.switchToHttp().getResponse().statusCode
            })
           return result
        } catch (error) {
            throw new Error(error)
        }
    }
}