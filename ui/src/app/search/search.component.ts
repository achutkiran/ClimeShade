import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  zip:string;
  zipcode;
  title:string = "Weather Details";
  showLogin:boolean =true;
  showWeather:boolean = false;
  error:boolean = false;
  @ViewChild('zipcodeElement') zipcodeElement:ElementRef;
  // matcher = new MyErrorStateMatcher();
  // zipFormControl:FormControl = new FormControl('',[Validators.required,this.zipValidator]) ;
  constructor(private router:Router,private route:ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.zipcodeElement.nativeElement.focus();
    
  }

  updateWeather(){
    this.zipcode =this.zip;
    this.showWeather= true;
  }
  public setError(error:boolean):void{
    // console.log(error);
    this.error = error;
  }
  // zipValidator(){
  //   console.log("hi");
  //   return this.error? {error:true}:null;
  // }

}
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     return !!(control && control.invalid && (control.dirty || control.touched));
//   }
// }
