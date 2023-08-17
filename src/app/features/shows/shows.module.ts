// src/app/features/shows/shows.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShowsListComponent } from './shows-list/shows-list.component';

@NgModule({
  declarations: [ShowsListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ShowsListComponent }])],
})
export class ShowsModule {}
