import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes =[
  {path: '', component:IndexComponent},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'zipcode',component:SearchComponent,
    children:[
      {path:'zip/:id',component:WeatherDetailsComponent},
    ]},
  {path:'sidebar',component:SidebarComponent,
    children: [
      {path:'',redirectTo:"dashboard",pathMatch:"full"},
      {path:'dashboard',component: DashboardComponent},
      {path:'settings',component:SettingsComponent}
    ]
  },
  {path:"settings",component:SettingsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})


export class AppRoutingModule { 
  // constructor(private router:Router){
  //   this.router.errorHandler = (error:any) => {
  //     console.log(error);
  //     this.router.navigate(['404']);
  //   }
  // }
}
