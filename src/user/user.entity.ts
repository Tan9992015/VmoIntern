import { Role } from "src/enum/role.enum";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({
        type:'enum',
        enum:Role,
        default:Role.USER
    })
    role:Role

    @Column()
    address:string

    @Column()
    phoneNumber:string

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase()
    }

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @DeleteDateColumn({name:'deleted_at'})
    deletedAt:Date
}
