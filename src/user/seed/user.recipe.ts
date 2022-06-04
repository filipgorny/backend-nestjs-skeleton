import { User } from '../entity/user.entity';
import { SeedRecipe } from '../../seed/recipe/seed-recipe';

export class UserRecipe extends SeedRecipe {
  title = 'admin user entities';

  public async run(): Promise<void> {
    const admin = new User();
    admin.email = 'site-admin@example.com';
    admin.password = this.em.persist(siteAdmin);

    this.addReference('siteAdmin', siteAdmin);
  }

  priority = 2;
}
