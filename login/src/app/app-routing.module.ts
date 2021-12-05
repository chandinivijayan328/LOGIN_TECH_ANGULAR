import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'user', loadChildren:  () => import('./users-profile/users-profile.module').then(x => x.UsersProfileModule) },
    { path: 'login', loadChildren:  () => import('./login-reg/login-reg.module').then(x => x.LoginRegModule) },
    { path: '', redirectTo: 'login' , pathMatch: 'full' },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }