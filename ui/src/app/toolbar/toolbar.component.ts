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
  @Input()
  show:boolean;
  @Input()
  showLogin:boolean;
  ngOnInit() {
  }
  searchWeather(){
    this.router.navigate([`/zipcode`],)
  }
  loggedIn():boolean{
    return localStorage.getItem("token") != null;
  }
  login(){
    this.router.navigate([`/login`]);
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.router.navigate([`/login`]);
  }
  settings(){
    this.router.navigate(['/sidebar/settings']);
  }
  dashboard(){
    this.router.navigate([`/sidebar`]);
  }

}
