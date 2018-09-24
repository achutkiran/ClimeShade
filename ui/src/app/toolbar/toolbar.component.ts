import { Component, OnInit, Query, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenServiceService } from '../token-service.service';
import { SideNavService } from '../side-nav.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public router:Router, private service:SideNavService) { }
  @Input()
  title:string;
  @Input()
  show:boolean;
  @Input()
  showLogin:boolean;
  showIcon:boolean;
  ngOnInit() {
    let mobile = this.service.isItMobile();
    if(mobile && (this.title == "Settings" || this.title == "Dashboard")){
      this.showIcon = true;
    }
    else{
      this.showIcon  = false;
    }
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
  openSideNav(){
    this.service.openSideNav();
  }

}
