import * as migration_20240820_213523_initial from './20240820_213523_initial';
import * as migration_20240820_213741_movies from './20240820_213741_movies';

export const migrations = [
  {
    up: migration_20240820_213523_initial.up,
    down: migration_20240820_213523_initial.down,
    name: '20240820_213523_initial',
  },
  {
    up: migration_20240820_213741_movies.up,
    down: migration_20240820_213741_movies.down,
    name: '20240820_213741_movies'
  },
];
