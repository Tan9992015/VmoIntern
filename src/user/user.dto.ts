import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty,IsOptional } from "class-validator";
import { Role } from "src/enum/role.enum";

export class UserDto {
    @IsOptional()
    role:Role

    @IsNotEmpty()
    name:string 

    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    @IsOptional()
    phoneNumber:string

    @IsOptional()
    address:string
    
}

export class UserDtoExt extends PartialType(UserDto) {
    @IsNotEmpty()
    password: string

    @IsEmail()
    email: string 
}