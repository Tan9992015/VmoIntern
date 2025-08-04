import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { LoggingService } from "./logging.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector:Reflector,
        private loggingService:LoggingService
    ) {}

    async intercept(context:ExecutionContext, next:CallHandler):Promise<any> {
        const handler = context.getHandler() //get method 
        const isLoggable = this.reflector.get<boolean>('loggable',handler) // 2 tham số là key với nơi gắn metadata

        if(!isLoggable) return await lastValueFrom(next.handle())

        const request = context.switchToHttp().getRequest()
        const { method,url,user } = request
        // console.log('request',request)
        const userEmail= user?.email ?? 'nothing'

        try {
            const result = await lastValueFrom(next.handle())
           const log = await this.loggingService.logToDB({
                method:method,
                url:url,
                userEmail:userEmail,
                timeStamp: new Date().toISOString(),
                status: context.switchToHttp().getResponse().statusCode
            })
            console.log('result',result)
           return result
        } catch (error) {
            throw new Error(error)
        }
    }
}