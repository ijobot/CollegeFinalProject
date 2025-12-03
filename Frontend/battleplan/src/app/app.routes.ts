import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: '',
    title: 'BattlePlan Login',
    component: LoginComponent,
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
