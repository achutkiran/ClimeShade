import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes =[
  {path: '', component:IndexComponent},
  {path:'index',component:IndexComponent},
  {path:'zipcode/:zip',component:WeatherDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
