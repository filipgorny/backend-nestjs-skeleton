import { MigrationObject, MigrationsOptions } from '@mikro-orm/core';
import { Migration22052800 } from './migration22052800';

const migrations = [Migration22052800];

export const migrationsList: MigrationObject[] = migrations.map((migration) => {
  return {
    name: migration.name,
    class: migration,
  };
});

export const migrationsOptions: MigrationsOptions = {
  migrationsList,
  allOrNothing: true,
};
