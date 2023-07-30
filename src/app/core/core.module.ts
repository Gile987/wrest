import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { TjpwRosterService } from './services/tjpw-roster.service';
import { AuthenticationService } from './services/authentication.service';
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
    AuthenticationService
  ],
  declarations: [
  ],
})
export class CoreModule { }
