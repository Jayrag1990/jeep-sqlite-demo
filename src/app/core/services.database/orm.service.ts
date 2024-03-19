import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { DatabaseService } from './database.service';
import DatabaseSource from '../data-sources/DatabaseSource';

@Injectable()
export class OrmService {
  isOrmService: Boolean = false;

  constructor(private sqliteService: SQLiteService,
    private databaseService: DatabaseService) { };

  // Private functions
  /**
   * Initialize the TypeOrm Service
   */
  async initialize(): Promise<void> {
    let scope = this;
    try {
      // Check connections consistency
      await this.sqliteService.checkConnectionConsistency();

      // Loop through your DataSources
      for (const dataSource of [/*UserDataSource,*/ DatabaseSource]) {
        const database = String(dataSource.options.database);
        if (!dataSource.isInitialized) {
          // initialize the DataSource
          await dataSource.initialize()
          // .then(async () => {
          console.log(`*** dataSource has been initialized ***`)

          // run the migrations
          await dataSource.runMigrations()
            .finally(async () => {
              console.log(`*** dataSource runMigration has been run succesfully ***`)
              // load the data for this datasource
              {
                scope.databaseService.database = database;
                scope.databaseService.dataSource = dataSource;
                await scope.databaseService.initialize();
                console.log(`*** authorPostService has been initialized ***`)
              }
              if (scope.sqliteService.getPlatform() === 'web') {
                // save the databases from memory to store
                await scope.sqliteService.getSqliteConnection().saveToStore(database);
                console.log(`*** inORMService saveToStore ***`)
              }
            });
          // });
        }
        console.log(`DataSource: ${database} initialized`);
      }

      this.isOrmService = true;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}

