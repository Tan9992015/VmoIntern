import { Role } from "src/enum/role.enum";

export class UserDto {
    role?:Role
    name?:string 
    email?:string
    password?:string
    address?:string
    
}