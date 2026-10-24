import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

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

  const config = new DocumentBuilder()
    .setTitle('API Agencia de viajes')
    .setDescription('Simulacro de sistema de cotizaciones con control de roles y API Key por cabeceras')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header'}, 'x-api-key')
    .addApiKey({ type: 'apiKey', name: 'x-user', in: 'header'}, 'x-user')
    .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    fs.writeFileSync(
      'swagger.json',
      JSON.stringify(document, null, 2),
    );

  //lee el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();