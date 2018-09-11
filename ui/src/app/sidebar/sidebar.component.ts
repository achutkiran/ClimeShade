import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenServiceService } from '../token-service.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token;
  firstName:string;
  title:string="Dashboard";
  constructor(private tokenService:TokenServiceService,private apollo:Apollo) { }

  ngOnInit() {
    this.token = this.tokenService.getToken();
    this.apollo.watchQuery({
      query:gql`
      {
        user(id:${this.token['userId']}){
          firstName
        }
      }
    `}).valueChanges
    .subscribe(result => {
      // console.log(result);
     this.firstName  = result.data["user"]["firstName"];
    })
    // console.log(this.token);
  }


}
