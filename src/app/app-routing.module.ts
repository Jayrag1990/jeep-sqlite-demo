import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';

const routes: Routes = [
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  { path: '', redirectTo: 'security', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
