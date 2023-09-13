import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HomeRoutingModuleModule } from './modules/home/home-routing-module.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeRoutingModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
