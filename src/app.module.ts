import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { EnvironmentVariables } from './config/environment-variables.interface';
import { createMikroormConfig } from './config/create-mikroorm-config';
import { SeedModule } from './seed/seed.module';
import { Migrator } from './migration/migrator';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return createMikroormConfig(configService);
      },
      inject: [ConfigService],
    }),
    SeedModule.forRoot(),
    UserModule,
  ],
  controllers: [],
  providers: [AppService, Migrator],
})
export class AppModule {}
