import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TjpwRosterService } from './core/services/tjpw-roster.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedRosterModule } from './shared/modules/shared-roster.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedRosterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [TjpwRosterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
