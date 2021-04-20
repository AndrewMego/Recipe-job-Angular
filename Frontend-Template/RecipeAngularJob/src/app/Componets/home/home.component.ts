import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Idata } from 'src/app/models/interfaces/idata';
import { Ifind } from 'src/app/models/interfaces/ifind';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { Iuser } from 'src/app/models/interfaces/iuser';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@ViewChild('getloc') selectLoc: any;
  selectLoc: any
  selectTag: any
  DataLoc: Idata[]
  DataTag: Idata[]
  DataComp : Iuser[]
  getData: Ifind
  getLastJob: Ijob[]
  categoryList: Idata[]
  findForm: FormGroup
  constructor(private _apiTagServ: JobServiceService, private _apiHomeServ: HomeServiceService, private _apiFindServ: JobServiceService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this._apiHomeServ.getData()
      .subscribe(
        (data) => {
          this.DataLoc = data;
          console.log(this.DataLoc)
        }
        , (err) => {
          console.log(err);
        })


    this._apiHomeServ.getInfoCat()
      .subscribe(
        (data) => {

          this.categoryList = data
          console.log(this.categoryList)
        }
        , (err) => {
          console.log(err);
        })

    this._apiTagServ.getTag()
      .subscribe(
        (data) => {
          console.log(data)
          this.DataTag = data;

        }
        , (err) => {
          console.log(err);
        })

    this._apiHomeServ.allJobs()
      .subscribe(
        (data) => {
          console.log(data)
          let sliced_array = data.slice(0, 4);
          this.getLastJob = sliced_array;

        }
        , (err) => {
          console.log(err);
        })

    this._apiHomeServ.getCompany()
      .subscribe(
        (data) => {
          console.log("comp")
          console.log(data)
          let sliced_array = data.slice(0, 4);
          this.DataComp = sliced_array;

        }
        , (err) => {
          console.log(err);
        })
    this.findForm = this.formbuilder.group({
      loc: [''],
      tag: [''],
      title: [''],
    })

  }
  selecttag(item) {
    if (item != 0) {
      this.findForm.patchValue({
        tag: item
      })
    } else {
      this.findForm.patchValue({
        tag: ""
      })
    }
  }

  getJob_in_Category(item){
    // this._apiFindServ.getJobrelatedCategory(
    //   item).subscribe((res) => {

    //     console.log(res)

    //   }, (err) => { console.log(err) })
    localStorage.setItem('getID' , item)

  }
  selectlocation(item) {
    if (item != 0) {
      this.findForm.patchValue({
        loc: item,
      })
    } else {
      this.findForm.patchValue({
        loc: ""
      })
    }



  }
  btnSearch() {

    this.getData = this.findForm.value
    console.log(this.getData)
    this._apiFindServ.findJob(
      this.getData).subscribe((res) => {

        //alert(res['msg'])
        console.log(res)

      }, (err) => { console.log(err) })


  }

}
