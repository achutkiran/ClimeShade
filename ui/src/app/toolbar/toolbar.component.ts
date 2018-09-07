import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public router:Router) { }

  ngOnInit() {
  }
  searchWeather(zipcode:number){
    if(zipcode){
      this.router.navigate([`/zipcode/${zipcode}`])
    }
    else{
      alert("Enter zipcode");
    }
  }

}
