import { ShipmmentMethod, ShipmmentStatus } from 'src/enum/shipment.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidv4} from 'uuid'
@Entity()
export class ShipmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'enum',
        enum:ShipmmentMethod,
        default:ShipmmentMethod.ECONOMY
    })
    shipmentMethod:ShipmmentMethod

    @Column({
        type:'enum',
        enum:ShipmmentStatus,
        default:ShipmmentStatus.PENDING
    })
    shipmentStatus:ShipmmentStatus

    @Column()
    address:string

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date
}