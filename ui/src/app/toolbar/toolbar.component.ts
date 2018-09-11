import { Component, OnInit, Query, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public router:Router) { }
  @Input()
  title:string;
  show:boolean =true;
  ngOnInit() {
    if(this.title=="Weather Details"){
      this.show=false;
    }
  }
  searchWeather(zipcode:number){
    if(zipcode){
      this.router.navigate([`/zipcode/${zipcode}`],)
    }
    else{
      alert("Enter zipcode");
    }
    console.log(this.title);
  }

}
