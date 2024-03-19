import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services.database/database.service';
import { Item } from 'src/app/core/model/entities/item.schema';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private route: Router,
    public databaseService: DatabaseService
  ) {

  }
  async ngOnInit() {
    this.isLoading = false;
    this.list = await this.databaseService.ItemRepository.find();
  }


  list: Item[] = [];
  async addItem() {
    let scope = this;
    let item: Item = new Item();
    //test.Id = 1;
    item.Name = "Jayrag";
    item.Title = "Test Title"

    await scope.databaseService.ItemRepository.save(item);

    scope.list = await scope.databaseService.ItemRepository.find();

    console.log(scope.list);
  }
}