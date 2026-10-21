import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //configuracion global de validaciones (aqui filtramos los campos no permitidos )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remueve cualquier propiedad del body que no este en el DTO
      forbidNonWhitelisted: true, // error HTTP 400 si vienen campos extraños
      transform: true, //convierte automaticamente los payloads al tipo de objeto del DTO
    }),
  );

  //lee el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();