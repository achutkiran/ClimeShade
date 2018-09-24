import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
