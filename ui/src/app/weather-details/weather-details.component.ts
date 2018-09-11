import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  @Input()
  zipcode:number;
  loading:boolean = true;
  weatherCondition:string;
  icon:string;
  temperature:string;
  displayedColumns: string[] = ['zipcode','city','pressure','humidity','windSpeed'];
  dataSource = new Array();
  constructor(private apollo: Apollo,private route: ActivatedRoute) { }

  ngOnInit() {
    // if(this.zipcode== null){
    //   this.route.params.subscribe((params: Params) => {
    //     this.zipcode = params['zip'];
    //   })
    // }
    console.log(this.zipcode);
    this.getWeatherData();
  }

  getWeatherData(): void{
    this.apollo.watchQuery({
      query: gql`
        {
          weather(zipcode:${this.zipcode}){
            zipcode,
            temperature,
            pressure,
            humidity,
            windSpeed,
            city,
            weatherCondition,
            icon
          }
        }
      `,
    })
    .valueChanges
    .subscribe(result => { 
      // console.log(result);
      this.dataSource.push(result.data['weather']);
      this.temperature = result.data['weather']['temperature'];
      this.weatherCondition = result.data['weather']['weatherCondition'];
      this.icon = result.data['weather']['icon'];
      // console.log(this.icon);
      this.loading = false;
    });
  }
}
