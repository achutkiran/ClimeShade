import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  token ={};
  constructor() { }
  setToken(token:string,userId:string){
    localStorage.setItem("token",token);
    localStorage.setItem("userId",userId);
  }
  
}
