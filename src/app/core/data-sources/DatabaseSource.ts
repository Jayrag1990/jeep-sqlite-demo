import { DataSource } from 'typeorm';
import { SQLiteService } from '../services.database/sqlite.service';
import { Item } from '../model/entities/item.schema';
import { FirstTime1710488399955 } from '../migrations/1710488399955-firstTime';

const sqliteService = new SQLiteService();
const sqliteConnection = sqliteService.getSqliteConnection();

export default new DataSource({
  name: 'DBConnection',
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'D-database',
  mode: 'no-encryption',
  entities: [Item],
  migrations: [FirstTime1710488399955],
  subscribers: [],
  logging: [/*'query',*/ 'error', 'schema'],
  migrationsRun: false,
  //migrations: ['src/app/core/migrations/*{.ts,.js}'],
  synchronize: false,
});
