import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@angular/core';
import { Item } from '../model/entities/item.schema';

@Injectable()
export class DatabaseService {
  public dataSource!: DataSource;
  public database!: string;
  private postRepository!: Repository<Item>
  constructor() { }

  async initialize(): Promise<void> {
    console.log(`@@@ this.dataSource.isInitialized: ${this.dataSource.isInitialized} @@@@`)
    if (this.dataSource.isInitialized) {
      this.postRepository = this.dataSource.getRepository(Item);
    } else {
      return Promise.reject(`Error: AuthorDataSource not initialized`)
    }
  }

  public get ItemRepository(): Repository<Item> {
    return this.postRepository;
  }
}