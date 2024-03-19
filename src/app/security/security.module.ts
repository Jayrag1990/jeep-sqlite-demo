import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './pages';
import { MsalRedirectComponent } from '@azure/msal-angular';

@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ MsalRedirectComponent]
})
export class SecurityModule { }
