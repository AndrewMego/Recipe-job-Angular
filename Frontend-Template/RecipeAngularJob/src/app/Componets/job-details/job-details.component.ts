import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iaplay } from 'src/app/models/interfaces/iaplay';
import { Ijob } from 'src/app/models/interfaces/ijob';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  JobDetail: Ijob
  UploadMsg: String = "Upload CV"
  UploadMsgCer: String = "Upload Certifications(Option)"
  public cvPath;
  public cerPath;
  aplayForm: FormGroup
  
  @ViewChild('myName') myName: ElementRef;
  @ViewChild('approvalletter') approvalletter: ElementRef;
  @ViewChild('writeSummary') writeSummary: ElementRef;
  myEmail: any
  userID: any
  myDate: Date = new Date();
  getjobID: any
  msg:boolean = false
  uploadData:any = new FormData();
  applaying: boolean = false
  applayingmsg:string
  usertype:string
  loggedIn:boolean = false
  jobAplaying:Iaplay[]
  companyName :string
  acceptApplay : any
  constructor(private http: HttpClient,public datePipe: DatePipe, private _apiFindServ: JobServiceService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('userInfo')){
      this.myEmail = JSON.parse(sessionStorage.getItem('userInfo')).email
      this.userID = JSON.parse(sessionStorage.getItem('userInfo')).userId
      this.usertype =  JSON.parse(sessionStorage.getItem('userInfo')).typeUser
      this.companyName =  JSON.parse(sessionStorage.getItem('userInfo')).first_name
      this.loggedIn = true
    }else{this.loggedIn = false}
   
    console.log(this.userID)
    this.getjobID = localStorage.getItem('jobInfo')
    console.log(this.getjobID)
    this._apiFindServ.getJobInfo(
      parseInt(this.getjobID)).subscribe((res) => {
        console.log(res)
        this.JobDetail = res

      }, (err) => { console.log(err) })


    this.aplayForm = this.formbuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern(new RegExp('01[0-9]{9}'))]],
    })
  
  if(this.usertype == 'Company'){

    this._apiFindServ.getj_ApplayingUser_with_relatedCompany(
      parseInt(this.getjobID)).subscribe((res) => {
        console.log(res)
        this.jobAplaying = res

      }, (err) => { console.log(err) })
  }
  
  }

  acceptedAplay(element){
    console.log(element)
    this.acceptApplay = element
  }

  accepted(){

    if(this.approvalletter.nativeElement.value !=null){
      console.log("enter")
      console.log(this.acceptApplay)
      let getMsg = this.approvalletter.nativeElement.value
      let objAplyMsg = {'mailCom':this.myEmail ,
                        'MsgApproval':getMsg,
                        'mailEmp':this.acceptApplay.email,
                        'nameCom':this.companyName,
                        'userfirstName':this.acceptApplay.name
                  }
      this._apiFindServ.sendAply(objAplyMsg).subscribe((res) => {
          console.log(res)
          //this.jobAplaying = res
  
        }, (err) => { console.log(err) })
    }
  }

  openCertify(ele){
    for(let i =0 ; i< ele.length ; i++){
      window.open(ele[i]);
    }
  }
  openCV(ele){
    window.open(ele);
  }
  preview(event: any) {

    this.cvPath = event.target.files[0];
    this.UploadMsg = this.cvPath.name

  }
  previewCer(event: any) {

    if(event.target.files)
    {
      for(let i =0 ; i<event.target.files.length ; i++){
        this.cerPath = event.target.files[i];
        this.uploadData.append('uploadCertifi', this.cerPath);
   
      }
     
      
      }
   
    this.UploadMsgCer = this.cerPath.name

  }
  aplay() {
    this.msg = false
   
   

    if (this.myName.nativeElement.value != "" && this.aplayForm.get('phone_number').value && this.cvPath != "" && this.cvPath != null) {
    
      this.uploadData.append('jobID', this.getjobID);
      this.uploadData.append('userID', this.userID);
      this.uploadData.append('phone', this.aplayForm.get('phone_number').value);
      this.uploadData.append('email', this.myEmail);
      this.uploadData.append('name', this.myName.nativeElement.value);
      this.uploadData.append('uploadCv', this.cvPath);
      this.uploadData.append('writeSummary', this.writeSummary.nativeElement.value);
      this.uploadData.append('published_at', this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
     
      
      this.http.post('http://127.0.0.1:8000/Job/aplayJob/', this.uploadData).subscribe(
        data => {
          if (data['msg'] == 'success'){
        
          this.applaying = true;
          this.applayingmsg = "waiting for accepting your aplying"
          }else if (data['msg'] == 'exist'){ 
            this.applaying = true;
            this.applayingmsg="you already have aplying"
          }
        },
        error => console.log(error)
      );
    }
    else{
      this.msg = true
    }

  }
}
