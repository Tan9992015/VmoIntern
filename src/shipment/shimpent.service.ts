import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShipmentEntity } from "./shipment.entity";
import { Repository } from "typeorm";
import { ShipmentDto } from "./shipment.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class ShipmentService {
    constructor(@InjectRepository(ShipmentEntity)
                private readonly shipmentRepository:Repository<ShipmentEntity>,
                private readonly userService: UserService
) {}
async createShipment(shipmentDto: ShipmentDto): Promise<any> {
   try {
     const newShipment = new ShipmentEntity()
     newShipment.address = shipmentDto.address
     newShipment.shipmentMethod = shipmentDto.shipmentMethod
     newShipment.shipmentStatus = shipmentDto.shipmentStatus
     const foundUser = await this.userService.findOneById(shipmentDto.userId)
     if(!foundUser) return {
        err:1,
        mess:'user not found'
    }
     newShipment.user = await foundUser
     const savedShipment = await this.shipmentRepository.save(newShipment)
     return {
        err:0,
        mess:'create shipment success',
        shipmentDetail:savedShipment
     }

   } catch (error) {
    throw new Error(error)
   }
}

async getAllShipment():Promise<ShipmentEntity[]>{
    return await this.shipmentRepository.find()
}

async getShipmentById(id:string):Promise<any> {
    return await this.shipmentRepository.findOne({where:{id}})
}

async getShipmentByUserId(userId:string):Promise<any> {
    return await this.shipmentRepository.find({where:{user:{id:userId}}})
}

async updateShipment(userId:string,shipmentId:string,shimpent:ShipmentDto):Promise<any> {
    const foudShipments= await this.shipmentRepository.find({where:{ user:{ id:userId } } })
    let check:boolean= false
     for(const shimpent of foudShipments){
            if(shipmentId===shimpent.id){
                check = true
                break
            }
        }
      if(check===false) return {
            err:1,
            mess:'shipment not belong to user to update'
        }
     await this.shipmentRepository.update(shipmentId,shimpent)
     return {
        err:0,
        mess:'update success'
     }
}

async deleteShipmentByUserIdAndId(userId:string,shipmentId:string):Promise<any> {
    const foudShipments= await this.shipmentRepository.find({where:{ user:{ id:userId } } })
        let check:boolean = false
        for(const shimpent of foudShipments){
            if(shipmentId===shimpent.id){
                check = true
                break
            }
        }
        if(check===false) return {
            err:1,
            mess:'shipment not belong to user to delete'
        }
        await this.shipmentRepository.softDelete(shipmentId)
        return {
            err:0,
            mess:'delete success'
        }
    }
}
