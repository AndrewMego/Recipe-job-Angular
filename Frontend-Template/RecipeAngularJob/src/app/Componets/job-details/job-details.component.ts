import { Component, OnInit } from '@angular/core';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  JobDetail:Ijob
  constructor(private _apiFindServ: JobServiceService) { }

  ngOnInit(): void {

    let getjobID = localStorage.getItem('jobInfo')
    console.log(getjobID)
    this._apiFindServ.getJobInfo(
      parseInt(getjobID)).subscribe((res) => {
        console.log(res)
       this.JobDetail = res

      }, (err) => { console.log(err) })

  }

}
