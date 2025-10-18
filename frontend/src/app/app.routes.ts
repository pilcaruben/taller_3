import { Routes } from '@angular/router';
import { EmpleadosPage } from './features/empleados/empleados.page';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosPage },
  { path: '**', redirectTo: 'empleados' },
];
