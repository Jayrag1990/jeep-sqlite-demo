import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { SQLiteService } from './core/services.database/sqlite.service';
import { OrmService } from './core/services.database/orm.service';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, LogLevel, ProtocolMode, PublicClientApplication, ServerResponseType } from '@azure/msal-browser';
import { ConfigConstant } from './core/constants/config-constant';
import { DatabaseService } from './core/services.database/database.service';


// AoT requires an exported function for factories
export function initializeFactory(init: SQLiteService) {
  return () => init.initializeWebStore();
}


const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;


const consentScopes = ['Mail.ReadWrite', 'openid', 'offline_access'];
const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/', consentScopes);

async function test(msalService: MsalService): Promise<MsalService> {
  await msalService.initialize();
  return msalService;
}

export function MSALInstanceFactory(msalService: MsalService): () => void {
  return async () => {
    await msalService.instance.initialize();
    return await msalService.instance.handleRedirectPromise()
      .then((e) => {
        console.log(e);
      })
      .catch(error => {
        console.error('Error handling redirect:', error);
      });
  };
}

export const MsalGuardConfig: MsalGuardConfiguration = {
  interactionType: !isIE ? InteractionType.Popup : InteractionType.Popup,
  authRequest: {
    scopes: consentScopes
  },
  loginFailedRoute: '/'
};
export const MsalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: !isIE ? InteractionType.Popup : InteractionType.Popup,
  protectedResourceMap
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: ConfigConstant.GrahpApiClientId, // Application (client) ID from the app registration
          authority: ConfigConstant.GrahpApiUrl, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: (ConfigConstant.GrahpApiRedirectUrl), // This is your redirect URI
          // serverResponseType:"code"
          OIDCOptions: {
            serverResponseType: ServerResponseType.QUERY
          },
          protocolMode: ProtocolMode.OIDC
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
        system: {
          allowNativeBroker: false,
          loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
              if (containsPii) {
                return;
              }
              switch (level) {
                case LogLevel.Error:
                  console.error(message);
                  return;
                case LogLevel.Info:
                  console.info(message);
                  return;
                case LogLevel.Verbose:
                  console.debug(message);
                  return;
                case LogLevel.Warning:
                  console.warn(message);
                  return;
              }
            },
            piiLoggingEnabled: false
          },


        },
      }),
      MsalGuardConfig,
      MsalInterceptorConfig
    ),
  ],
  providers: [SQLiteService, OrmService, DatabaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [SQLiteService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: MSALInstanceFactory,
      deps: [MsalService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

