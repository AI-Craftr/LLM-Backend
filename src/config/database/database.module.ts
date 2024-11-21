import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<any>('db.type'),
          host: configService.get<string>('db.host'),
          port: configService.get<number>('db.port'),
          username: configService.get<string>('db.user'),
          password: configService.get<string>('db.pass'),
          database: configService.get<string>('db.name_development'),
          synchronize: configService.get<boolean>('is_development') ? true : false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class Database {}
