import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { TjpwRosterService } from './services/tjpw-roster.service';
import { UserService } from './services/users.service';
import { SharedRosterModule } from '../shared/modules/shared-roster.module';

@NgModule({
  declarations: [
    SharedRosterModule,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    TjpwRosterService,
    UserService
  ],
  exports: [
    SharedRosterModule,
  ]
})
export class CoreModule { }
