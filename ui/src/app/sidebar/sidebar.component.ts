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
  constructor(private apollo:Apollo,private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    // console.log(`token is ${this.userId}`);
    this.apollo.watchQuery({
      query:gql`
      {
        user(id:${this.userId}){
          firstName
        }
      }
    `}).valueChanges
    .subscribe(result => {
      // console.log(result);
     this.firstName  = result.data["user"]["firstName"];
    },(error)=>{
      // console.log(error.message.slice(14));
      this.router.navigate(['/login']);
    })
    // console.log(this.token);
  }


}
