import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GraphQLModule} from './apollo.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

//Angular material imports

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';




import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './/app-routing.module';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    IndexComponent,
    WeatherDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
