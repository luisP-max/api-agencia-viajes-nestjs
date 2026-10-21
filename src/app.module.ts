import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // cargamos las variables de entorno .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // async a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, //registra de forma automatica las tablas/entidades que le agregamos
        synchronize: true //sincroniza esquemas automaticamente
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}