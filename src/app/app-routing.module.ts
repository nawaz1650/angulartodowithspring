import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TodoResolver } from './todo/Todo.resolver';
import { AuthGuard } from './authGuard';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard],
    resolve: [TodoResolver],
  },
  {path:'forgot_pswd',component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
