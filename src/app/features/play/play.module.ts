import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: PlayComponent }];

@NgModule({
  declarations: [PlayComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class PlayModule {}
