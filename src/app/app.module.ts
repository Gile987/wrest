import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TjpwRosterService } from './core/services/tjpw-roster.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { RosterModule } from './features/roster/roster.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RosterModule,
    SharedModule
  ],
  providers: [TjpwRosterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
