import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WrestlerListComponent } from './core/components/wrestler-list/wrestler-list.component';
import { TjpwRosterService } from './core/services/tjpw-roster.service';

@NgModule({
  declarations: [
    AppComponent,
    WrestlerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TjpwRosterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
