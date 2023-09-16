import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserGuard } from './core/guards/user.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const lazyLoadedModules = {
  roster: () =>
    import('./features/roster/roster.module').then((m) => m.RosterModule),
  login: () =>
    import('./core/components/login/login.module').then((m) => m.LoginModule),
  register: () =>
    import('./core/components/register/register.module').then(
      (m) => m.RegisterModule
    ),
  shows: () =>
    import('./features/shows/shows.module').then((m) => m.ShowsModule),
  play: () => import('./features/play/play.module').then((m) => m.PlayModule),
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: lazyLoadedModules.login,
    canActivate: [UserGuard],
  },
  {
    path: 'register',
    loadChildren: lazyLoadedModules.register,
    canActivate: [UserGuard],
  },
  { path: 'roster', loadChildren: lazyLoadedModules.roster },
  { path: 'shows', loadChildren: lazyLoadedModules.shows },
  { path: 'play', loadChildren: lazyLoadedModules.play },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
