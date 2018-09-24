import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { TokenServiceService } from '../token-service.service';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId;
  firstName:string;
  mode:String="side";
  open:boolean;
  _subscription;
  constructor(private apollo:Apollo,private router: Router,private service:SideNavService) {
    this.open = this.service.sideNav;
    this._subscription = service.sidebarChange.subscribe((value)=>{
      console.log(value);
      this.open = value;
    })
   }

  ngOnInit() {
    this.browserCheck();
    this.userId = localStorage.getItem("userId");
    this.apollo.watchQuery({
      query:gql`
      {
        user(id:${this.userId}){
          firstName
        }
      }
    `}).valueChanges
    .subscribe(result => {
     this.firstName  = result.data["user"]["firstName"];
    },(error)=>{
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
    
  }

  browserCheck(){
    if(window.innerWidth<=768){
      this.mode="over";
      this.service.closeSideNav();
      this.service.mobileSite();
    }
    else{
      this.service.openSideNav();
      this.service.desktopSite();
    }
  }
  
  close(){
    console.log("closed")
    this.service.closeSideNav();
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
  
}
