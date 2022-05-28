import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { entities } from '../config/entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(entities),
    ConfigModule.forRoot({ load: [config] }),
  ],
})
export class UserModule {}
