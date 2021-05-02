import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-myjob',
  templateUrl: './myjob.component.html',
  styleUrls: ['./myjob.component.css']
})
export class MyjobComponent implements OnInit {
  listJob:Ijob[]
  jobIDDelete: number
  constructor(private _router: Router, private http: HttpClient, private _apiFindServ: JobServiceService) { }

  ngOnInit(): void {
    let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
    
  this._apiFindServ.getjob_with_related_company(
        parseInt(getInfoUserSession['userId'])).subscribe((res) => {
          console.log(res)
        
            this.listJob = res
       

        }, (err) => { console.log(err) })
  }

 

  deleteJob(element) {

    this.jobIDDelete = element
  }
sureDelete() {
    this.http.post('http://127.0.0.1:8000/Job/deleteJob', this.jobIDDelete).subscribe(
      data => {
        if (data['msg'] == 'success') {
          this._router.navigateByUrl('/profile');
        }
      },
      error => console.log(error)
    );
  }
 jobInfoId(item) {
    console.log(item)
    sessionStorage.setItem('jobInfo', item)
  }

}
