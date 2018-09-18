import { Component, OnInit } from '@angular/core';
import { TokenServiceService } from '../token-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId:string;
  zip;
  loading=true;
  title:string="Dashboard";
  show=true;
  showLogin=true;
  constructor(private apollo:Apollo) {
   }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.apollo.watchQuery({
      query:gql`
      {
        user(id:${this.userId}){
          climate{
            zipcode
          }
        }
      }
    `}).valueChanges
    .subscribe(result => {
     this.zip  = result.data["user"]['climate']["zipcode"];
     this.loading=false;
    })
  }
    

}
