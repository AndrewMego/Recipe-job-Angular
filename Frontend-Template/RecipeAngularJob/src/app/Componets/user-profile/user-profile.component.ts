import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TagModel } from 'ngx-chips/core/accessor';
import { Iblog } from 'src/app/models/interfaces/iblog';
import { Idata } from 'src/app/models/interfaces/idata';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { Iuser } from 'src/app/models/interfaces/iuser';
import { JobServiceService } from 'src/app/services/job-service.service';

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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserInfo: Iuser
  listJob: Ijob[]
  moreJob: boolean = false
  isJob: boolean = false
  listBlog: Iblog[]
  moreBlog: boolean = false
  myLike: any
  isBlog: boolean = false
  alllistBlog: Iblog[]
  formEditProfile: FormGroup
  public imagePath;
  ttype: any
  checked: boolean = false
  userID: string
  jobIDDelete: number
  blogIDDelete: number
  addtionSkill: any
  arrImage: any = []
  @ViewChild('textareaUpdate') elem: ElementRef;
  @ViewChild('selectEx') selectEx: ElementRef;
  @ViewChild('selectTypeJob') selectTypeJob: ElementRef;
  @ViewChild('selectGender') selectGender: ElementRef;
  ///////////////
  @ViewChild('editTitle') editTitle: ElementRef;
  @ViewChild('salary') salary: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('qualifi') qualifi: ElementRef;
  @ViewChild('benefit') benefit: ElementRef;
  @ViewChild('respons') respons: ElementRef;
  @ViewChild('vacancy') vacancy: ElementRef;
  @ViewChild('Requirements') Requirements: ElementRef;
  jobIDUpdate: number;
  blogIDUbdate: number
  arrSkills: any
  TypeEx: any;
  TypeJob: any;
  TypeGender: any
 loggedIn :boolean=true
  _Ex: String
  _typejob: String
  _gender: String
  isEdit: boolean = true
  constructor(private _router: Router, private formbuilder: FormBuilder, private http: HttpClient, private _apiFindServ: JobServiceService,) { }


  ngOnInit(): void {

    let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
    this.UserInfo = getInfoUserSession
    if (this.UserInfo.skills !== undefined && getInfoUserSession['typeUser'] != 'Company') {

      this.arrSkills = this.UserInfo.skills.split(",");
      this.addtionSkill = this.arrSkills
    }
    console.log(this.UserInfo)
    this.ttype = getInfoUserSession['typeUser']
    this.userID = getInfoUserSession['userId']
    if (getInfoUserSession['typeUser'] == 'Company') {
      this.getMy_likes(this.userID)
      this.getjobs(getInfoUserSession['userId']);
      this.getblogs(getInfoUserSession['userId']);




    } else {

      this._apiFindServ.getjob_with_related_ApplayingUser(
        parseInt(getInfoUserSession['userId'])).subscribe((res) => {
          console.log(res)
          if (res.length > 0) {
            //this.isBlog = true
            this.isJob = true
            let sliced_array = res.slice(0, 4);
            this.listJob = sliced_array
            if (res.length > 5) {
              //this.alllistBlog = res;
              //this.moreBlog = true
            }
          }



        }, (err) => { console.log(err) })

    }


    this.formEditProfile = this.formbuilder.group({
      username: ['', [Validators.required, Validators.min(7)]],
      firstname: ['', [Validators.required, Validators.min(3), Validators.pattern(new RegExp('^[a-zA-Z]+$'))]],
      lastname: ['', [Validators.required, Validators.min(3), Validators.pattern(new RegExp('^[a-zA-Z]+$'))]],
      password: ['', [Validators.required, Validators.min(8)]],
      conpassword: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(new RegExp('01[0-9]{9}'))]],
      uploadImg: [''],
      location: [''],
      insta: [''],
      git: [''],
      face: [''],
      linkedin: [''],
      campanyname: [''],
      companyField: [''],
    }, { validator: ConfirmedValidator('password', 'conpassword') })


    this.TypeEx = [
      { 'id': '1', 'ex': ' Less than 1 year' },
      { 'id': '2', 'ex': ' From 1 to 3 year' },
      { 'id': '3', 'ex': ' From 3 to 5 year' },
      { 'id': '4', 'ex': 'More than 5 year' }]


    this.TypeJob = [{ 'id': '1', 'typejob': ' Full Time' },
    { 'id': '2', 'typejob': ' Part Time' }]

    this.TypeGender = [{ 'id': '1', 'gender': 'Male' },
    { 'id': '2', 'gender': 'Female' }]




  }

  getblogs(userID) {
   
    this.getMy_likes(userID);
  }
  getjobs(userID) {
    this._apiFindServ.getjob_with_related_company(
      parseInt(userID)).subscribe((res) => {
        console.log(res)
        if (res.length > 0) {
          this.isJob = true

          let sliced_array = res.slice(0, 4);
          this.listJob = sliced_array
          if (res.length > 5) {
            //this.alllistBlog = res;
            this.moreJob = true
          }
        }

      }, (err) => { console.log(err) })
  }
  selectT(val) {
    console.log(val)
    this._typejob = val
    this.selectTypeJob.nativeElement.value = val

  }
  selectG(val) {
    console.log(val)
    this._gender = val
    this.selectGender.nativeElement.value = val
  }
  selectE(val) {
    console.log(val)
    this._Ex = val
    this.selectEx.nativeElement.value = val

  }

  preview(event: any) {
    this.imagePath = event.target.files[0];
  }

  deleteJob(element) {

    this.jobIDDelete = element
  }

  editID(element) {

    this.jobIDUpdate = element
  }
  deleteBlog(element) {


    this.blogIDDelete = element
  }


  onModelAdded = ($event: TagModel) => {
    console.log(this.addtionSkill);
    // this.additionTag.push($event);
  }

  onModelRemoved = ($event: TagModel) => {
    console.log(`$event`, $event);
    //this.additionTag.pop($event);
    console.log(this.addtionSkill);
  }
  updateSkill() {
    let skillStr = ""
    for (let i = 0; i < this.addtionSkill.length; i++) {

      skillStr += this.addtionSkill[i]
      for (let j = 1; j < this.addtionSkill.length - i; j++) {
        skillStr += ","
        break;
      }

    }
    const uploadData = new FormData();
    uploadData.append('skills', skillStr);
    uploadData.append('userID', this.userID);
    this.http.post('http://127.0.0.1:8000/Users/updateSkill/', uploadData).subscribe(
      data => {
        if (data['msg'] == 'success') {
          sessionStorage.removeItem('userInfo')
          sessionStorage.setItem('userInfo', JSON.stringify(data['obj']))
          window.location.href = 'http://localhost:4200/profile';
        }
      },
      error => console.log(error)
    );

  }
  sureDelete() {
    this.http.post('http://127.0.0.1:8000/Job/deleteJob/', this.jobIDDelete).subscribe(
      data => {
        if (data['msg'] == 'success') {
          //this.getjobs(this.userID)
          window.location.href = 'http://localhost:4200/profile'; 
          //this._router.navigateByUrl('/profile');
        }
      },
      error => console.log(error)
    );
  }
  sureDeleteBlog() {
    this.http.post('http://127.0.0.1:8000/Blog/deleteBlog', this.blogIDDelete).subscribe(
      data => {
        if (data['msg'] == 'success') {

          window.location.href = 'http://localhost:4200/profile';
        }
      },
      error => console.log(error)
    );
  }

  jobInfoId(item) {
    console.log(item)
    sessionStorage.setItem('jobInfo', item)
  }


  updateIDBlog(element) {

    console.log(element)
    this.blogIDUbdate = element
  }


  updateBlog() {

    const uploadData = new FormData();
    //

    let userID = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(userID)
    for (let i = 0; i < this.arrImage.length; i++) {
      uploadData.append('images', this.arrImage[i]);
    }
    console.log(this.elem.nativeElement.value)
    uploadData.append('blogID', this.blogIDUbdate + "");
    uploadData.append('description', this.elem.nativeElement.value);


    this.http.post('http://127.0.0.1:8000/Blog/ubdateBlog', uploadData).subscribe(
      data => {

        window.location.href = 'http://localhost:4200/profile';
      },
      error => console.log(error)
    );
  }
  update() {

    const uploadData = new FormData();

    if (this.imagePath != null) {
      uploadData.append('profile', this.imagePath);
    }

    if (this.ttype == 'Company' && this.formEditProfile.get('username').value &&
      this.formEditProfile.get('password').value &&
      this.formEditProfile.get('location').value &&
      this.formEditProfile.get('phone_number').value &&
      this.formEditProfile.get('companyField').value &&
      this.formEditProfile.get('campanyname').value) {

      console.log(this.formEditProfile.get('username').value)
      this.checked = true

      uploadData.append('userID', this.userID)
      uploadData.append('username', this.formEditProfile.get('username').value)
      uploadData.append('firstname', this.formEditProfile.get('firstname').value)
      uploadData.append('lastname', this.formEditProfile.get('lastname').value)
      uploadData.append('password', this.formEditProfile.get('password').value)
      uploadData.append('location', this.formEditProfile.get('location').value)
      uploadData.append('phone_number', this.formEditProfile.get('phone_number').value)
      uploadData.append('insta', this.formEditProfile.get('insta').value)
      uploadData.append('git', this.formEditProfile.get('git').value)
      uploadData.append('face', this.formEditProfile.get('face').value)
      uploadData.append('linkedin', this.formEditProfile.get('linkedin').value)
      uploadData.append('companyField', this.formEditProfile.get('companyField').value)
      uploadData.append('typeUser', this.ttype)
      uploadData.append('campanyname', this.formEditProfile.get('campanyname').value)
      console.log(uploadData)
    }

    if (this.ttype != 'Company' && this.formEditProfile.get('username').value &&
      this.formEditProfile.get('password').value &&
      this.formEditProfile.get('location').value &&
      this.formEditProfile.get('phone_number').value &&
      this.formEditProfile.get('firstname').value &&
      this.formEditProfile.get('lastname').value) {



      uploadData.append('userID', this.userID)
      uploadData.append('username', this.formEditProfile.get('username').value)
      uploadData.append('firstname', this.formEditProfile.get('firstname').value)
      uploadData.append('lastname', this.formEditProfile.get('lastname').value)
      uploadData.append('password', this.formEditProfile.get('password').value)
      uploadData.append('location', this.formEditProfile.get('location').value)
      uploadData.append('phone_number', this.formEditProfile.get('phone_number').value)
      uploadData.append('insta', this.formEditProfile.get('insta').value)
      uploadData.append('git', this.formEditProfile.get('git').value)
      uploadData.append('face', this.formEditProfile.get('face').value)
      uploadData.append('linkedin', this.formEditProfile.get('linkedin').value)

      uploadData.append('typeUser', this.ttype)
      this.checked = true

    }

    if (this.checked == true) {
      console.log(uploadData)
      this.http.post('http://127.0.0.1:8000/Users/updateUser', uploadData).subscribe(
        data => {
          if (data['msg'] == 'success') {
            alert('Successful Update Your Profile')
            sessionStorage.removeItem('userInfo')
            sessionStorage.setItem('userInfo', JSON.stringify(data['obj']))
            window.location.href = 'http://localhost:4200/profile';
          } else { alert(data['msg']) }
        },
        error => console.log(error)
      );

    } else {
      alert('Enter all Data or close this window')
    }

  }
  save() {
    if (this.editTitle.nativeElement.value != '' &&
      this.salary.nativeElement.value != '' &&
      this.desc.nativeElement.value != '' &&
      this.qualifi.nativeElement.value != '' &&
      this.benefit.nativeElement.value != '' &&
      this.respons.nativeElement.value != '' &&
      this.vacancy.nativeElement.value != '') {

      let newObj = {
        'jobID': this.jobIDUpdate,
        'title': this.editTitle.nativeElement.value,
        'salary': this.salary.nativeElement.value,
        'benefit': this.benefit.nativeElement.value,
        'vacancy': this.vacancy.nativeElement.value,
        'description': this.desc.nativeElement.value,
        'qualifi': this.qualifi.nativeElement.value,
      }

      this.apiSave(newObj);
    } else {
      this.isEdit = false
    }
  }


  saveOther() {

    if (this.editTitle.nativeElement.value != '' &&
      this.salary.nativeElement.value != '' &&
      this.Requirements.nativeElement.value != '' &&
      this.vacancy.nativeElement.value != '') {

      let newObj = {
        'jobID': this.jobIDUpdate,
        'title': this.editTitle.nativeElement.value,
        'salary': this.salary.nativeElement.value,
        'description': this.Requirements.nativeElement.value,
        'qualifi': this.qualifi.nativeElement.value,
      }

      this.apiSave(newObj);
    } else {
      this.isEdit = false
    }
  }


  apiSave(obj) {

    this.http.post('http://127.0.0.1:8000/Users/updateJob', obj).subscribe(
      data => {
        if (data['msg'] == 'success') {

          this._router.navigateByUrl('/profile');
        } else { }
      },
      error => console.log(error)
    );
  }

  likeBlog(elem, liked) {

    if (liked == true) {
      let obj = { 'blogID': elem, 'userID': this.userID, 'liked': '1' }

      this.http.post('http://127.0.0.1:8000/Blog/Like/', obj).subscribe(
        data => {
          console.log(data)

          this.getMy_likes(this.userID)

        },
        error => console.log(error)
      );
    } else {
      let obj = { 'blogID': elem, 'userID': this.userID, 'liked': '0' }

      this.http.post('http://127.0.0.1:8000/Blog/Like/', obj).subscribe(
        data => {
          console.log(data)
          this.getMy_likes(this.userID)

        },
        error => console.log(error)
      );
    }


  }
  getMy_likes(userid) {

    this._apiFindServ.getBlog_with_related_company(
      parseInt(userid)).subscribe((res) => {
        console.log(res)
        if (res.length > 0) {
          this.isBlog = true

          this.http.post('http://127.0.0.1:8000/Blog/getlikesBlog_belongUser/', userid).subscribe(
            data => { 
              this.myLike = data
              if (this.myLike.length > 0) {
                for (let j = 0; j < res.length; j++) {
                  for (let i = 0; i < this.myLike.length; i++) {
    
    
                    if (res[j].blogID == data[i] && res[j].myLiked != true) {
                      console.log(res[j])
                      res[j].myLiked = true
                      break;
                    } else { res[j].myLiked = false }
                  }
                }
              }else{
                for (let j = 0; j < res.length; j++) {
                  res[j].myLiked  = false}
              }
             },
            error => console.log(error)
          );

          let sliced_array = res.slice(0, 4);
          this.listBlog = sliced_array
          if (res.length > 5) {
            this.alllistBlog = res;
            this.moreBlog = true
          }
        }



      }, (err) => { console.log(err) })


  }
}








