import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms'
import { AccountComponent } from './account/account.component'
import { HttpClientModule } from '@angular/common/http'
// import { JwPaginationModule } from 'jw-angular-pagination';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // JwPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export const Routing = [AccountComponent, LoginComponent]
