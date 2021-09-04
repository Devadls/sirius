import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppserviceService } from './appservice.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragScrollModule
  ],
  providers: [AppserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
