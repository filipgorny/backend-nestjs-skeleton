import { Migration } from '@mikro-orm/migrations';

export class Migration2021112000 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table message add scope varchar(255)');
  }

  async down(): Promise<void> {
    this.addSql('alter table message drop scope');
  }
}
