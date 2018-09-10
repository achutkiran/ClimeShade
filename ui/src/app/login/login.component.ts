import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  requiredFormControl = new FormControl('',[Validators.required]);
  constructor(private apollo: Apollo,public snackBar: MatSnackBar) { }

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
        console.log(data)
      },(error) => {
        this.snackBar.open(error.message.slice(14,),"close");
      });
    }
  }

}
