import { MikroORM } from '@mikro-orm/core';
import { DynamicModule } from '@nestjs/common';
import { SeedRecipe } from './recipe/seed-recipe';
import { SeedRegistry } from './registry/seed.registry';
import { SeederService } from './service/seeder.service';

export class SeedModule {
  static forRoot(...seedRecipes: SeedRecipe[]): DynamicModule {
    const registry = new SeedRegistry();

    registry.addRecipe(...seedRecipes);

    return {
      module: SeedModule,
      providers: [
        {
          provide: SeederService,
          useFactory: (orm: MikroORM) => {
            return new SeederService(orm, registry);
          },
          inject: [MikroORM],
        },
      ],
      exports: [SeederService],
    };
  }
}
