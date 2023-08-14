import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserGuard } from './core/guards/user.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'roster',
    loadChildren: () =>
      import('./features/roster/roster.module').then((m) => m.RosterModule),
  },
  { path: 'login', loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule), canActivate: [UserGuard] },
  { path: 'register', loadChildren: () => import('./core/components/register/register.module').then(m => m.RegisterModule), canActivate: [UserGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
