import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { entities } from '../config/entities';
import { PasswordService } from './service/password.service';
import { SeedModule } from 'src/seed/seed.module';
import { UserRecipe } from './seed/user.recipe';

@Module({
  imports: [
    MikroOrmModule.forFeature(entities),
    ConfigModule.forRoot({ load: [config] }),
    SeedModule.forFeature(new UserRecipe()),
  ],
  providers: [PasswordService],
})
export class UserModule {}
