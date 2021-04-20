import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType:string
  loggedIn:boolean = false
  constructor( private _router:Router , private _apiloginServ:UserServiceService) {

   
    // this._apiloginServ.currentMessageSubscriber.subscribe((data : any)=>{
    //   if(data.isRefresh ){

    //     if(sessionStorage.getItem('userInfo')){
    //       let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
    //       this.userType = getInfoUserSession['typeUser']
    //       this.loggedIn = true
    //     }else{this.loggedIn = false}

    //    }
    // })
   }

  ngOnInit(): void {

    if(sessionStorage.getItem('userInfo')){
      let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
      this.userType = getInfoUserSession['typeUser']
      this.loggedIn = true
    }else{this.loggedIn = false}

    
  }
  // isTokenAvailabe(){
  //   if(sessionStorage.getItem('userInfo')){
  //     let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
  //     this.userType = getInfoUserSession['typeUser']
  //     this.loggedIn = true
  //   }else{this.loggedIn = false}
  // }

  logout(){
    sessionStorage.removeItem('userInfo')
    this.loggedIn = false
    this.userType = ""
    this._router.navigateByUrl('/home');
  }


}

/////////////////////////////////////////


