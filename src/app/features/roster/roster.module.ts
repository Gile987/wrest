import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RosterRoutingModule } from './roster-routing.module';



@NgModule({
  declarations: [
    RosterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RosterRoutingModule
  ],
  exports: [
    RosterComponent
  ]
})
export class RosterModule { }
