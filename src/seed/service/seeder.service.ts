import { MikroORM } from '@mikro-orm/core';
import { UseRequestContext } from '@mikro-orm/nestjs';
import { Seed } from '../../core/entity/seed.entity';
import { SeedRecipe } from '../recipe/seed-recipe';
import { SeedRegistry } from '../registry/seed.registry';

export class SeederService {
  constructor(private orm: MikroORM, private readonly registry: SeedRegistry) {}

  async seed() {
    this.registry.recipes.sort((r1, r2) => {
      return r2.priority - r1.priority;
    });

    for (const recipe of this.registry.recipes) {
      const exisiingSeed = await this.orm.em.findOne(Seed, {
        title: recipe.title,
      });

      if (exisiingSeed) {
        continue;
      }

      try {
        console.log(`Running ${recipe.title}`);
        await this.runRecipe(recipe);
      } catch (e) {
        console.log(`Error executing recipe ${e}`);
      }
    }
  }

  @UseRequestContext()
  async runRecipe(recipe: SeedRecipe) {
    recipe.setEm(this.orm.em);

    await recipe.run();

    const seed = new Seed();
    seed.title = recipe.title;

    this.orm.em.persist(seed);

    recipe.setEm(this.orm.em);

    this.orm.em.flush();
  }
}
