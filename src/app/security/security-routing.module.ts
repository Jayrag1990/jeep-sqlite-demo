import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  {
    path: '', component: SecurityComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
