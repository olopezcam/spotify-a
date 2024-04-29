import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { authorizationInterceptor } from '@core/interceptors/session.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    importProvidersFrom(BrowserModule),
    CookieService,
    provideHttpClient(withInterceptors([authorizationInterceptor])),
  ],
}).catch((err) => console.error(err));
