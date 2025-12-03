import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CombatantsComponent } from './pages/combatants/combatants.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'combatants',
    component: CombatantsComponent,
  },
];
