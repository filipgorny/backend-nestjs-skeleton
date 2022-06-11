import { User } from '../entity/user.entity';
import { SeedRecipe } from '../../seed/recipe/seed-recipe';
import { PasswordService } from '../service/password.service';

export class UserRecipe extends SeedRecipe {
  title = 'admin user entities';

  constructor(private passwordService: PasswordService) {
    super();
  }

  public async run(): Promise<void> {
    const admin = new User();
    admin.email = 'admin@example.com';
    admin.password = await this.passwordService.encode('admin');

    this.addReference('admin', admin);
  }

  priority = 2;
}
