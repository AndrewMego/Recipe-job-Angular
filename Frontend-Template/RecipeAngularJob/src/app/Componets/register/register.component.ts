import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/interfaces/iuser';
import { UserServiceService } from 'src/app/services/user-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() myFirstInputParameter: string;
  @ViewChild('typeUser') elem: ElementRef;

  public imagePath;
  imgURL: any;
  public message: string;
  registerForm: FormGroup;
  registerUser: Iuser
  typelist: string[];
  getType: boolean
  ttype: string
  UploadMsg: String = "Upload image"
  constructor(private http: HttpClient, private formbuilder: FormBuilder, private _apiregisterServ: UserServiceService, private _router: Router) {
    this.typelist = ["Employee", "Company"];
  }



  ngOnInit(): void {

    this.getType = false;

    this.registerForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.min(7)]],
      firstname: ['', [Validators.required, Validators.min(3), Validators.pattern(new RegExp('^[a-zA-Z]+$'))]],
      lastname: ['', [Validators.required, Validators.min(3), Validators.pattern(new RegExp('^[a-zA-Z]+$'))]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      conpassword: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(new RegExp('01[0-9]{9}'))]],
      uploadImg: [''],
      insta: [''],
      git: [''],
      face: [''],
      typeUser: [''],
      campanyname: ['']
      //  passwords: this.formbuilder.group({
      //     password :['', [Validators.required , Validators.min(8)]],
      //     conpassword :['', [Validators.required ]]
      // }, {validator: this.passwordConfirming}),

    }, { validator: ConfirmedValidator('password', 'conpassword') })




  }

  preview(event: any) {

    this.imagePath = event.target.files[0];
    this.UploadMsg = this.imagePath.name
   
  }

  ff(val) {

    console.log(val)
    this.ttype = val
    console.log(this.ttype)
  }



  register() {
    console.log(this.ttype)
    if (this.ttype == '0' || this.ttype == undefined) {
     
      this.getType = false;

    } else {
      this.getType = true
      this.registerForm.patchValue({
        typeUser: this.ttype
      })

      



      const uploadData = new FormData();

      console.log(uploadData)

      uploadData.append('profile', this.imagePath, this.imagePath.name);


      uploadData.append('username', this.registerForm.get('username').value)
      uploadData.append('firstname', this.registerForm.get('firstname').value)
      uploadData.append('lastname', this.registerForm.get('lastname').value)
      uploadData.append('email', this.registerForm.get('email').value)
      uploadData.append('password', this.registerForm.get('password').value)
      uploadData.append('phone', this.registerForm.get('phone_number').value)
      uploadData.append('insta', this.registerForm.get('insta').value)
      uploadData.append('git', this.registerForm.get('git').value)
      uploadData.append('face', this.registerForm.get('face').value)
      uploadData.append('typeUser', this.registerForm.get('typeUser').value)
      uploadData.append('campanyname', this.registerForm.get('campanyname').value)
     
      this.http.post('http://127.0.0.1:8000/Users/register', uploadData).subscribe(
        data => {
          if (data['msg'] == 'success'){
          alert('check your email and press on link to active your account')
          window.location.href = 'http://localhost:4200/login';
          }else{ alert(data['msg'])}
        },
        error => console.log(error)
      );
    }
    // this._apiregisterServ.userRegister(
    //   this.registerUser).subscribe((res) => {

    //     alert(res['msg'])
    //     console.log(res)

    //   }, (err) => { console.log(err) })
  }




}
