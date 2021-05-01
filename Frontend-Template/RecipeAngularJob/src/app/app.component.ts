import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RecipeAngularJob';
  grtlocalIgLogin: any
  isgologin: boolean = false
  ngOnInit(): void {

    this.isgologin = true
    
    this.grtlocalIgLogin = localStorage.getItem('gotologin')
   
      
  }

  iflogin(isPresslogin){

    this.isgologin =isPresslogin
  }
}



