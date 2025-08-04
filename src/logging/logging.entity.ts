import { Injectable } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoggingEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    method:string

    @Column()
    url:string

    @Column()
    userEmail:string

    @Column()
    timeStamp:Date

    @Column()
    status:Number
}