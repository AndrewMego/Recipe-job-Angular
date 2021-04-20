import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/interfaces/iuser';
import { UserServiceService } from 'src/app/services/user-service.service';

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
  constructor(private formbuilder: FormBuilder, private _apiregisterServ: UserServiceService, private _router: Router) {
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
      phone: ['', [Validators.required, Validators.pattern(new RegExp('01[0-9]{9}'))]],
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

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files.item(0).type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    } else {

      
      var reader = new FileReader();
      this.imagePath = files.item(0);
      this.UploadMsg = this.imagePath.name
      console.log(this.imagePath)
      reader.readAsDataURL(files.item(0));

      reader.onload = function ( loadEvent ) {
        console.log("load event",   loadEvent.target.result);
        const formData = new FormData();
        formData.append('file', loadEvent.target.result as string);
     }
     
     /* reader.onload = () => {
        
        this.imgURL = reader.result as string;
        console.log(this.imgURL)
        this.registerForm.patchValue({
          uploadImg: reader.result
        });



      };*/

    }
  }

  ff(val) {

    console.log(val)
    this.ttype = val
    console.log(this.ttype)
  }



  register() {

    if (this.elem.nativeElement.innerText == '0') {
      this.getType = false;

    } else {

      this.getType = true

      this.registerForm.patchValue({

        typeUser: this.ttype
      })

      this.registerUser = this.registerForm.value
      console.log(this.registerUser)
      this._apiregisterServ.userRegister(
        this.registerUser).subscribe((res) => {

          alert(res['msg'])
          console.log(res)

        }, (err) => { console.log(err) })
    }


  }

}
