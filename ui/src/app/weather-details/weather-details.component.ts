import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  zipcode:number;
  loading:boolean = true;
  weatherCondition:string;
  icon:string;
  temperature:string;
  displayedColumns: string[] = ['zipcode','city','pressure','humidity','windSpeed'];
  dataSource = new Array();
  constructor(private apollo: Apollo,private route: ActivatedRoute) { }

  ngOnInit() {
    this.zipcode = +this.route.snapshot.paramMap.get('zip');
    // this.zipcode = 75080;
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
