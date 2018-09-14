import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  loading:boolean = true;
  weatherCondition:string;
  icon:string;
  temperature:string;
  zip:number;
  pressure:string;
  humidity:string;
  windSpeed:string;
  city:string;
  constructor(private apollo: Apollo,private route: ActivatedRoute) { }

  ngOnInit() {
    // if(this.zipcode== null){
    //   this.route.params.subscribe((params: Params) => {
    //     this.zipcode = params['id'];
    //   })
    // }
    // console.log(this.zipcode);
    // this.getWeatherData();
  }

  @Input()
    set zipcode(zip:number){
      this.loading = true;
      this.getWeatherData(zip);
    }
    @Output() onError: EventEmitter<boolean> = new EventEmitter<boolean>();
 

  getWeatherData(zipcode:number): void{
    this.apollo.watchQuery({
      query: gql`
        {
          weather(zipcode:${zipcode}){
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
      console.log(result);
      this.zip =result.data['weather']['zipcode'];
      this.temperature = result.data['weather']['temperature'];
      this.pressure = result.data['weather']['pressure'];
      this.humidity = result.data['weather']['humidity'];
      this.windSpeed = result.data['weather']['windSpeed'];
      this.city = result.data['weather']['city'];
      this.weatherCondition = result.data['weather']['weatherCondition'];
      this.icon = result.data['weather']['icon'];
      // console.log(this.icon);
      this.loading = false;
      this.onError.emit(false);
    },(error) =>{
        this.onError.emit(true);
    });
  }
}
