import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Idata } from 'src/app/models/interfaces/idata';
import { Ifind } from 'src/app/models/interfaces/ifind';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  DataLoc: Idata[]
  listJob: Ijob[]
  TypeEx: any
  TypeJob: any
  TypeGender: any
  getData: Ifind
  findForm: FormGroup
  constructor(private _apiFindServ: JobServiceService, private _apiHomeServ: HomeServiceService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.TypeEx = [' Less than 1 year', ' From 1 to 3 year', ' From 3 to 5 year', 'More than 5 year']
    this.TypeJob = [' Full Time', ' Part Time']
    this.TypeGender = ['Male', 'Female']

    this.findForm = this.formbuilder.group({
      loc: [''],
      keyword: [''],
      gender: [''],
      Ex: [''],
      typeJob: [''],
    })

    this._apiHomeServ.getData()
      .subscribe(
        (data) => {
          this.DataLoc = data;
          console.log(this.DataLoc)
        }
        , (err) => {
          console.log(err);
        })
    if (localStorage.getItem('getID')) {
      let getID = localStorage.getItem('getID');
      this._apiFindServ.getJobrelatedCategory(
        parseInt(getID)).subscribe((res) => {

          this.listJob = res

        }, (err) => { console.log(err) })
    }
  }
  selectlocation(item){
    if (item != 0) {
      this.findForm.patchValue({
        loc: item
      })
    } else {
      this.findForm.patchValue({
        loc: ""
      })
    }
  }
  selectEx(item){
    if (item != 0) {
      this.findForm.patchValue({
        Ex: item
      })
    } else {
      this.findForm.patchValue({
        Ex: ""
      })
    }
  }
  selectNature(item){
    if (item != 0) {
      this.findForm.patchValue({
        typeJob: item
      })
    } else {
      this.findForm.patchValue({
        typeJob: ""
      })
    }
  }
  selectGender(item){
    if (item != 0) {
      this.findForm.patchValue({
        gender: item
      })
    } else {
      this.findForm.patchValue({
        gender: ""
      })
    }
  }

  jobInfoId(item){
    console.log(item)
    localStorage.setItem('jobInfo' ,item)
  }
  btnSearch() {
    this.getData = this.findForm.value
    console.log(this.getData)
    this._apiFindServ.findJob(
      this.getData).subscribe((res) => {

        this.listJob = res['info']
        console.log(res)

      }, (err) => { console.log(err) })
  }

}
