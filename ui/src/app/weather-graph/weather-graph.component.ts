import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent implements OnInit {
  multi :any[]
  constructor(private apollo:Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query:gql`
        {
          forecast(zipcode:75080){
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
      this.multi = result.data['forecast'];
    })
  }

  view: any[] = [1000, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date & Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature in °F';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
 
}
