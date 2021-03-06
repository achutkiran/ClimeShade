import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title:string = "Register New User"
  myForm: FormGroup;
  generalForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  userNameError:boolean = false;
  zipError:boolean =false;
  showLogin:boolean=true;
  zipFormControl:FormControl = new FormControl('',[Validators.required]);
  constructor(private fb: FormBuilder,private apollo: Apollo,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      repPassword:[''], 
    },{validator: this.passwordValidation});
    this.generalForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
    })

  }
  passwordValidation(group: FormGroup){
    let pass = group.controls.password.value;
    let repPass = group.controls.repPassword.value;
    return pass===repPass ? null: {notSame: true}
  }
  register(firstName,lastName,zipcode,username,password){
    this.apollo.mutate({
      mutation: gql`
        mutation{
          createUser(
            firstName:"${firstName}"
            lastName:"${lastName}"
            zipcode:${zipcode}
            userName:"${username}"
            password:"${password}"
          )
        }
      `, fetchPolicy:"no-cache"
    }).subscribe(({data})=>{
      this.snackBar.open(data.createUser,"close",{duration:3000});
      this.router.navigate(['/login']);
    },(error)=>{
      error = error.message.slice(14,);
      if(error.includes("already exists")){
        this.userNameError = true;
      }
      else if(error.includes("valid zipcode")){
        this.zipError = true;
      }
      else{
        this.snackBar.open("Server is down","close",{duration:3000});
      }
    }
    );
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
    const invalidctrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidctrl || invalidParent);
  }
}
