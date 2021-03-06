import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userId:string;
  userName:string;
  loading:boolean = true;
  step:number
  passwordDisabled:boolean= true;
  passwordForm:FormGroup;
  matcher = new MyErrorStateMatcher();
  show:boolean = true;
  title:string="Settings";
  zipError:boolean=false;
  firstNameControl:FormControl = new FormControl({value:'',disabled:true},[Validators.required]);
  lastNameControl:FormControl = new FormControl({value:'',disabled:true},[Validators.required]);
  zipControl:FormControl = new FormControl({value:'',disabled:true},[Validators.required]);
  
  constructor(private fb:FormBuilder,private apollo:Apollo,private snackbar: MatSnackBar,private router:Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.initializeForm();
    this.step = 0;
    this.passwordForm =this.fb.group({
      password:[{value:"...secret...",disabled: true},Validators.required],
      rPassword:[{value:"",disabled:false},Validators.required]
    },{validator:this.passwordValidation});
    
  }

  setStep(step:number):void{
    this.step =step;
  }
  nextStep(){
    this.step += 1;
  }
  prevStep(){
    this.step -= 1;
  }

  passwordValidation(group:FormGroup){
    let pass = group.controls.password.value;
    let rPass = group.controls.rPassword.value;
    return pass === rPass ? null: {notsame:true};
  }

  enablePassword(){
    this.passwordForm.setValue({password:"",rPassword:""},);
    this.passwordDisabled = false;
    this.passwordForm.get('password').enable();
  }
  enableFirstName(){
    this.firstNameControl.enable();
  }
  enableLastName(){
    this.lastNameControl.enable();
  }
  enableZipcode(){
    this.zipControl.enable();
  }
  initializeForm(){
    this.apollo.watchQuery({
      query: gql`{
        user(id:${this.userId}){
          firstName
          lastName
          userName
          climate{
            zipcode
          }
        }
      }`
    })
    .valueChanges
    .subscribe(result =>{
        this.firstNameControl.setValue(result.data['user']['firstName']); 
        this.lastNameControl.setValue(result.data['user']['lastName']);
        this.zipControl.setValue(result.data['user']['climate']['zipcode']);
        this.userName = result.data['user']['userName']; 
        this.loading = false;
    },(error)=>{
      error = error.message.slice(14,);
      if(error.includes("login again")){
        this.snackbar.open("please login again","close",{duration:3000});
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }

    })
  }
  buttonDisable():boolean{
    let fNameForm:boolean = (this.firstNameControl.dirty && this.firstNameControl.valid);
    let lNameForm:boolean = (this.lastNameControl.dirty && this.lastNameControl.valid);
    let zipForm:boolean = (this.zipControl.dirty && this.zipControl.valid);
    let passForm:boolean = (this.passwordForm.dirty && this.passwordForm.valid);
    return !(fNameForm || lNameForm || zipForm || passForm);
  }
  submit(){
    let query:string =`mutation{
      updateUser(
        userId:${this.userId}
      `;
      if(this.firstNameControl.dirty){
        query += `firstName: "${this.firstNameControl.value}" `;
      }
      if(this.lastNameControl.dirty){
        query += `lastName: "${this.lastNameControl.value}" `;
      }
      if(this.zipControl.dirty){
        query += `zipcode: ${this.zipControl.value} `;
      }
      if(this.passwordForm.dirty){
        query += `password: "${this.passwordForm.value["password"]}" `;
      }
      query += `)}`;
      this.apollo.mutate({
        mutation:gql(query)
      }).subscribe(({data})=>{
        this.snackbar.open(data.updateUser,"close",{duration:3000});
      },(error)=>{
        error = error.message.slice(14,);
        if(error.includes("valid zipcode")){
          this.setStep(1);
          this.zipError = true;
        }
        else{
          this.snackbar.open("please login again","close",{duration:3000});
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      })   
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean{
    const invalidctrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidctrl || invalidParent);
  }
}
