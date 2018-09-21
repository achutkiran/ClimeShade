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
  passwordError:boolean=false;
  userError:boolean = false;
  uNameFormControl = new FormControl('',[Validators.required]);
  passwordFormControl = new FormControl('',[Validators.required]);
  constructor(private apollo: Apollo,public snackBar: MatSnackBar,public tokenservice:TokenServiceService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/sidebar']);
    }
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
        this.tokenservice.setToken(data.login[0],data.login[1]);
        this.router.navigateByUrl('/sidebar');
      },(error) => {
        error = error.message.slice(14,);
        if(error.includes("Wrong Password")){
          this.passwordError= true;
        }
        else if(error.includes("user not")){
          this.userError = true;
        }
        else{
          this.snackBar.open("Server is down","close",{duration:3000});
        }
      });
    }
  }

}
