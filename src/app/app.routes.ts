import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import {LoginComponent} from "./auth/login.component";
import {ListComponent} from "./shopping-list/list.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListComponent}
];
