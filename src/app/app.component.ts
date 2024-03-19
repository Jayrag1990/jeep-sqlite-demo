import { AfterContentInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { OrmService } from './core/services.database/orm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  constructor(private platform: Platform,
    private ormService: OrmService) {
    let scope = this;
    this.initializeApp();

    this.initOrmService()
      .finally(async () => {
        scope.isLoading = false;
        if (!scope.ormService.isOrmService) {
          throw new Error(`Error: TypeOrm Service didn't start`);
        }
      });
  }
  isLoading: boolean = true;
  initializeApp() {
    this.platform.ready().then(async () => {
    });
  }

  async ngAfterContentInit() { }

  async initOrmService() {
    try {
      await this.ormService.initialize();
      console.log(`*** ORM service has been initialized ***`)
    } catch (err: any) {
      const msg = err.message ? err.message : err
      throw new Error(`Error: ${msg}`);
    }
  }
}
