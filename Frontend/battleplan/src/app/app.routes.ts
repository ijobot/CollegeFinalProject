import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  // The base path automatically redirects to the /login path.
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  // The /login path is blocked by the AuthGuard to anyone already signed into the application.
  // To access the login screen again, the user must first sign out.
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'battlefield',
    title: 'Battlefield',
    component: BattlefieldComponent,
  },
  { path: 'about', title: 'About', component: AboutComponent },
];
