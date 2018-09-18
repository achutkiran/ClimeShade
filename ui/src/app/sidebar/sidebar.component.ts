import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId;
  firstName:string;
  mode:String="side";
  open:boolean=true;
  sidenavIcon:boolean=false;
  constructor(private apollo:Apollo,private router: Router) { }

  ngOnInit() {
    //this.browserCheck();
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
      this.router.navigate(['/login']);
    })

  }

  browserCheck(){
    if(window.innerWidth<=768){
      this.mode="over";
      this.open=false;
      this.sidenavIcon=true;
    }
  }


}
