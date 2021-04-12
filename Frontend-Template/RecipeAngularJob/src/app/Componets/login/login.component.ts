import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/interfaces/iuser';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginUser:Iuser
  constructor(private formbuilder: FormBuilder, private _apiloginServ:UserServiceService , private _router:Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    })
  }
  login(){
    this.loginUser = this.loginForm.value
    console.log(this.loginUser)
    this._apiloginServ.userLogin(
      this.loginUser).subscribe((res) => {
        console.log(res)
       
       // alert("added Post")
        sessionStorage.setItem('userInfo', JSON.stringify(res));
        this._router.navigateByUrl('/home');
      }, (err) => { console.log(err) })
  }
}
