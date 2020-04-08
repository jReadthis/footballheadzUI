import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnersComponent } from './owners/owners.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, OwnersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: 'owners', component: OwnersComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
