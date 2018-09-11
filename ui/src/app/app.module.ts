import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GraphQLModule} from './apollo.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WeatherGraphComponent } from './weather-graph/weather-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    IndexComponent,
    WeatherDetailsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    WeatherGraphComponent,
    SearchComponent
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
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
