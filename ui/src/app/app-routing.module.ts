import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes =[
  {path: '', component:IndexComponent},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'zipcode/:zip',runGuardsAndResolvers:'always',component:SearchComponent},
  {path:'sidebar',component:SidebarComponent,
    children: [
      {path:'',component: DashboardComponent,outlet:"sidebar"}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
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
