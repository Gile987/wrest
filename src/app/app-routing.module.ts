import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserGuard } from './core/guards/user.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const rosterLoadChildren = () =>
  import('./features/roster/roster.module').then((m) => m.RosterModule);
const loginLoadChildren = () =>
  import('./core/components/login/login.module').then((m) => m.LoginModule);
const registerLoadChildren = () =>
  import('./core/components/register/register.module').then(
    (m) => m.RegisterModule
  );
const showsLoadChildren = () =>
  import('./features/shows/shows.module').then((m) => m.ShowsModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'roster', loadChildren: rosterLoadChildren },
  { path: 'login', loadChildren: loginLoadChildren, canActivate: [UserGuard] },
  {
    path: 'register',
    loadChildren: registerLoadChildren,
    canActivate: [UserGuard],
  },
  { path: 'shows', loadChildren: showsLoadChildren },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
