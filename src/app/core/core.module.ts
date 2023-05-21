import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { TjpwRosterService } from './services/tjpw-roster.service';
import { UserService } from './services/users.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [
    TjpwRosterService,
    UserService
  ],
})
export class CoreModule { }
