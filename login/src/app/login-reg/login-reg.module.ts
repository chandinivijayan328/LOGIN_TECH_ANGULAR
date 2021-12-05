import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegRoutingModule } from './login-reg-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRegRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginRegModule { }
