import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'roster',
    loadChildren: () =>
      import('./features/roster/roster.module').then((m) => m.RosterModule),
  },
  { path: 'login', loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule), canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
