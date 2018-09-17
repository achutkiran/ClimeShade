import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { TempSelectDialogComponent } from '../temp-select-dialog/temp-select-dialog.component';



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
  reportedWeatherCondition:String;
  numReportedUsers:number;
  constructor(private apollo: Apollo,private route: Router,private dialog:MatDialog,private snackbar:MatSnackBar) { }

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
      console.log(zip);
      this.loading = true;
      this.getUserWeather(zip);
      this.getWeatherData(zip);
    }
    @Output() onError: EventEmitter<boolean> = new EventEmitter<boolean>();
 

  getUserWeather(zipcode:number):void{
    this.apollo.watchQuery({
      query: gql`
      {
        getUserWeather(zipcode:${zipcode}){
          weatherCondition
          numReportedUsers
        }
      }
      `
    })
    .valueChanges
    .subscribe(result =>{
      console.log(result);
      this.reportedWeatherCondition = result.data['getUserWeather']['weatherCondition'];
      this.numReportedUsers = result.data['getUserWeather']['numReportedUsers'];
      console.log("reportedWeatherCondition: "+ this.reportedWeatherCondition+"\nnumReportedUsers: "+this.numReportedUsers);
    })
  }
    
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
      // console.log(result);
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

  openDialog(){
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(TempSelectDialogComponent, dialogConfig)
        .afterClosed().subscribe(
          data => {
            console.log(data);
            if(data){
              this.pushWeatherData(data);
            }
          }
        )
  }
  pushWeatherData(data){
    let query = `
    mutation{
      updateUserWeather(zipcode:${this.zip}
      weatherCondition:"${data}")
    }`;
    this.apollo.mutate({
      mutation: gql(query)
    }).subscribe( ({data}) =>{
        this.snackbar.open(data.updateUserWeather,"close");
    },(error)=>{
      this.snackbar.open("Please Login again","close");
      this.route.navigate(['login']);
    })
  }
  loggedIn():boolean{
    return localStorage.getItem('userId')!=null?true:false;
  }
}
