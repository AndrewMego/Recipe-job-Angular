import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TagModel } from 'ngx-chips/core/accessor';
import { Observable } from 'rxjs';
import { Idata } from 'src/app/models/interfaces/idata';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { JobServiceService } from 'src/app/services/job-service.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-post-job-form',
  templateUrl: './post-job-form.component.html',
  styleUrls: ['./post-job-form.component.css'],

})
export class PostJobFormComponent implements OnInit {
  @ViewChild('selectEx') selectEx: ElementRef;
  @ViewChild('selectTypeJob') selectTypeJob: ElementRef;
  @ViewChild('selectGender') selectGender: ElementRef;
  @ViewChild('newCat') newCat: ElementRef;
  postEmailForm: FormGroup
  postJobForm: FormGroup
  DataLoc: Idata[]
  DataCat: Idata[]
  Job: Ijob
  selectedTag:number[]
  appendTagwithId: Idata
  selectCat: Idata[]

  checkTagOther = false; //check box
  checkCatOther = false; //check box

  checkSelectType: boolean = true;
  checkSelectGender: boolean = true;
  checkSelectEx: boolean = true;

  isTagEmpty: boolean = false;
  isCatEmpty: boolean = false;

  additionCat: String
  additionTag: Idata[];
  additionTagf: Idata[];
  TypeEx: any;
  TypeJob: any;
  TypeGender: any
  myDate: Date = new Date();


  _Ex: String
  _typejob: String
  _gender: String

  constructor(public datePipe: DatePipe, private formbuilder: FormBuilder, private _apiPostCatServ: JobServiceService, private _apiPostJobServ: JobServiceService, private _apiPostTagServ: JobServiceService, private _apiTagServ: JobServiceService) {


  }



  ngOnInit(): void {

    this._apiTagServ.getTag()
      .subscribe(
        (data) => {
          console.log(data)
          this.DataLoc = data;

        }
        , (err) => {
          console.log(err);
        })

    this._apiTagServ.getCat()
      .subscribe(
        (data) => {
          console.log(data)
          this.DataCat = data;

        }
        , (err) => {
          console.log(err);
        })

    this.TypeEx = [
      { 'id': '1', 'ex': ' Less than 1 year' },
      { 'id': '2', 'ex': ' From 1 to 3 year' },
      { 'id': '3', 'ex': ' From 3 to 5 year' },
      { 'id': '4', 'ex': 'More than 5 year' }]


    this.TypeJob = [{ 'id': '1', 'typejob': ' Full Time' },
    { 'id': '2', 'typejob': ' Part Time' }]

    this.TypeGender = [{ 'id': '1', 'gender': 'Male' },
    { 'id': '2', 'gender': 'Female' }]


    this.postJobForm = this.formbuilder.group({
      userID: [''],
      ExEmail: ['', [Validators.email]],
      title: ['', [Validators.required, Validators.min(6)]],
      location: ['', [Validators.required, Validators.min(8)]],
      jobType: [''],
      description: ['', [Validators.required, Validators.min(15)]],
      qualification: ['', [Validators.required, Validators.min(15)]],
      benefits: ['', [Validators.required, Validators.min(15)]],
      published_at: [''],
      vacancy: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      categoryID: ['']
    })

  }

  CatOther() {

    this.checkCatOther = !this.checkCatOther
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
  changeCat(val) {
    console.log(val.id)
    this.selectCat = val.id

  }
  changeTag(val) {
    let arr = []
    for (let i = 0; i < val.length; i++) {
      console.log(val[i].id)
      arr[i] = val[i].id
    }
    this.selectedTag= arr

  }


  onModelAdded = ($event: TagModel) => {
    console.log(this.additionTag);
    //this.additionTag.push($event.tag);
  }

  onModelRemoved = ($event: TagModel) => {
    console.log(`$event`, $event);
    //this.additionTag.pop($event);
    console.log(this.additionTag);
  }



  postJob() {
    console.log("enter")


    if (this.selectEx.nativeElement.value == '0') {
      this.checkSelectEx = false
    } else { this.checkSelectEx = true }

    if (this.selectTypeJob.nativeElement.value == '0') {
      this.checkSelectType = false
    } else { this.checkSelectType = true }

    if (this.selectGender.nativeElement.value == '0') {
      this.checkSelectGender = false
    } else { this.checkSelectGender = true }


    if (this.checkTagOther == true) {
      if (this.additionTag == null) {
        this.isTagEmpty = true
      } else { this.isTagEmpty = false }
    }
    else {
      if (this.selectedTag === undefined) {
        this.isTagEmpty = true
      } else { this.isTagEmpty = false }
    }

    if (this.checkCatOther == true) {

      if (this.newCat.nativeElement.innerText == null) {
        this.isCatEmpty = true
      } else { this.isCatEmpty = false }
    }
    else {

      if (this.selectCat == null) {
        this.isCatEmpty = true
      } else { this.isCatEmpty = false }
    }


    if (this.checkSelectType == true &&
      this.checkSelectGender == true &&
      this.checkSelectEx == true &&
      this.isTagEmpty == false &&
      this.isCatEmpty == false) {

      if (this.checkCatOther == true) {


        this._apiPostCatServ.postCat(
          this.newCat.nativeElement.innerText).subscribe((res) => {

            alert(res['id'])
            this.postJobForm.patchValue({
              categoryID: res['id']
            })

            console.log(res)

          }, (err) => { console.log(err) })

      } else {
        this.postJobForm.patchValue({
          categoryID: this.selectCat
        })
      }


      let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))


      this.postJobForm.patchValue({
        userID: getInfoUserSession['userId'],
        published_at: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        jobType: this._typejob,
        experience: this._Ex,
        gender: this._gender
      })

      this.Job = this.postJobForm.value
      console.log(this.Job)


      console.log(this.postJobForm.value)

      this._apiPostJobServ.postJob(
        this.Job).subscribe((res) => {

          console.log(res)

          if (this.checkTagOther == false) {

            this.appendTagwithId = { 'name': this.selectedTag, 'jobID': res }
            console.log(this.appendTagwithId)

          }
          else {

            this.appendTagwithId = { 'otherTags':this.additionTag, 'jobID': res, 'name': this.selectedTag }

          }


          this._apiPostTagServ.postTag(this.appendTagwithId).subscribe((res) => {
            console.log(res)

          }, (err) => { console.log(err) })



        }, (err) => { console.log(err) })

    }
  }

  postJobWithmail() {

    if (this.selectEx.nativeElement.value == '0') {
      this.checkSelectEx = false
    } else { this.checkSelectEx = true }

    if (this.selectTypeJob.nativeElement.value == '0') {
      this.checkSelectType = false
    } else { this.checkSelectType = true }

    if (this.selectGender.nativeElement.value == '0') {
      this.checkSelectGender = false
    } else { this.checkSelectGender = true }


    if (this.checkTagOther == true) {
      if (this.additionTag == null) {
        this.isTagEmpty = true
      } else { this.isTagEmpty = false }
    }
    else {
      if (this.selectedTag === undefined) {
        this.isTagEmpty = true
      } else { this.isTagEmpty = false }
    }




    let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))


    this.postJobForm.patchValue({
      userID: getInfoUserSession['userId'],
      published_at: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
      jobType: this._typejob,
      experience: this._Ex,
      gender: this._gender
    })

    this.Job = this.postJobForm.value
    console.log(this.Job)


    console.log(this.postJobForm.value)

    this._apiPostJobServ.postJob(
      this.Job).subscribe((res) => {

        console.log(res)

        if (this.checkTagOther == false) {

          this.appendTagwithId = { 'name': this.selectedTag, 'jobID': res }
          console.log(this.appendTagwithId)

        }
        else {

          this.appendTagwithId = { 'otherTags': this.additionTag, 'jobID': res, 'name': this.selectedTag }

        }


        this._apiPostTagServ.postTag(this.appendTagwithId).subscribe((res) => {
          console.log(res)

        }, (err) => { console.log(err) })



      }, (err) => { console.log(err) })

  }


}





// 