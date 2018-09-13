import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {MatSnackBar} from '@angular/material';
import {TokenServiceService} from "../token-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:string="Login";
  showSearch:boolean=true;
  requiredFormControl = new FormControl('',[Validators.required]);
  constructor(private apollo: Apollo,public snackBar: MatSnackBar,public tokenservice:TokenServiceService,private router:Router) { }

  ngOnInit() {
  }
  login(name:string,password:string){
    if(name.length !=0 && password.length != 0){
      this.apollo.mutate({
        mutation: gql`
        mutation {
          login(userName:"${name}"
          password:"${password}")
        }
        `,
        fetchPolicy: 'no-cache'
      }).subscribe(({data}) => {
        console.log(data);
        this.tokenservice.setToken(data.login[0],data.login[1]);
        this.router.navigateByUrl('/sidebar');
        console.log(data.login)
      },(error) => {
        this.snackBar.open(error.message.slice(14,),"close");
      });
    }
  }

}
