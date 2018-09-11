import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  zip:string;
  title:string = "Weather Details";
  constructor(private router:Router,private route:ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.zip = params['zip'];
      console.log(this.zip);
    })
  }

  updateWeather(){
     this.router.navigate([`/zipcode/${this.zip}`])
  }

}
