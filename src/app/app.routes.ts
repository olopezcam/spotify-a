import { Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { sessionGuardFuncional } from '@core/guards/sessionv2.guard';
import { HomePageComponent } from '@modules/home/page/home-page/home-page.component';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.homeRoutes),
    canActivate: [sessionGuardFuncional],
  },
];
