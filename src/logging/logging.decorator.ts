import { Injectable, SetMetadata } from "@nestjs/common";

export const LoggingDecorator = ()=>SetMetadata('loggable',true)
