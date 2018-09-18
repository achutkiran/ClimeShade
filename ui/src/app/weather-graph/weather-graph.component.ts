import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent implements OnInit {
  @Input()
  zipcode:number;
  single :any[];
  loading:boolean=true;
  constructor(private apollo:Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query:gql`
        {
          forecast(zipcode:${this.zipcode}){
            name
            series{
              name
              value
            }
          }
        }
      `
    }).valueChanges
    .subscribe(result =>{
      this.single = result.data['forecast'];
      this.loading =false;
    })
  }

 

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature in °F';
  timeline = true;
  autoScale = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
 
}
