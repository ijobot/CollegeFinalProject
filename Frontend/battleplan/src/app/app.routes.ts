import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'BattlePlan Login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    title: 'BattlePlan Home',

    component: HomeComponent,
  },
  {
    path: 'battlefield',
    title: 'BattlePlan Battlefield',

    component: BattlefieldComponent,
  },
  { path: 'about', title: 'BattlePlan About', component: AboutComponent },
];
