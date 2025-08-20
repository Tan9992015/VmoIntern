import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder().setTitle('API DOCUMENTATION')
                                      .setDescription('API DESCRIPTION')
                                      .setVersion('1.0')
                                      .addBearerAuth({
                                        type:'http',
                                        scheme:'bearer',
                                        bearerFormat:'JWT',
                                        name:'Authorization',
                                        description:'Enter JWT token',
                                        in:'header'
                                      },
                                      'access-token'// key để reference trong @ApiBearerAuth()
                                    )
                                      .build()
  const documentFactory =() => SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,documentFactory) // path, appp, document

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  await app.listen(3000);
}
bootstrap();
