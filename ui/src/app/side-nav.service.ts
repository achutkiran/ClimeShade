import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private mobile:boolean =false;
  public sideNav:boolean = false;
  sidebarChange:Subject<boolean> = new Subject<boolean>();
  constructor() { }

  mobileSite(){
    this.mobile = true;
  }
  desktopSite(){
    this.mobile = false;
  }
  isItMobile(){
    return this.mobile;
  }
  openSideNav(){
    this.sideNav = true;
    this.sidebarChange.next(this.sideNav);
  }
  closeSideNav(){
    this.sideNav = false;
    this.sidebarChange.next(this.sideNav);
  }
  
}
