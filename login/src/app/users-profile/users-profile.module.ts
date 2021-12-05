import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersProfileRoutingModule } from './users-profile-routing.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersProfileRoutingModule
  ]
})
export class UsersProfileModule { }
