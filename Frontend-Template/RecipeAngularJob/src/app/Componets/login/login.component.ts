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
  msg:boolean = false

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
        if(res['msg'] == 'no')
        {
          this.msg = true
        }else if(res['msg'] == 'notActive'){
          alert("you must check your mail to active this account")
        }
        else{

        console.log(res)  
        window.location.href = 'http://localhost:4200/home';
        //this._apiloginServ.notify({isRefresh : true});
        sessionStorage.setItem('userInfo', JSON.stringify(res['obj']));
       // this._router.navigateByUrl('/home');
        }
        
       
        
      }, (err) => { console.log(err) })
  }
}
