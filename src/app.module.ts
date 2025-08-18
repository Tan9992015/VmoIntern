import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderProductModule } from './order_product/orderProduct.module';
import { UserModule } from './user/user.module';
import { ShipmentModule } from './shipment/shipment.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './logging/logging.mdule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'123456',
      database:'ecom_schema',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    OrderProductModule,
    UserModule,
    ShipmentModule,
    PaymentModule,
    OrderModule,
    CategoryModule,
    AuthModule,
    CartModule,
    LoggingModule
  ]})
export class AppModule {}
