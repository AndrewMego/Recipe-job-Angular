import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Iblog } from 'src/app/models/interfaces/iblog';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
  alllistBlog: Iblog[]
  UploadMsg: String = "Upload image"
  blogsList: Iblog[]
  arrImage: any = []
  blogIDdelete: number
  blogIDUbdate: number
  myDate: Date = new Date();
  @ViewChild('textareaUpdate') elem: ElementRef;
  constructor(private _router: Router, private _apiFindServ: JobServiceService, private http: HttpClient, private formbuilder: FormBuilder, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getblogs();
  }

  preview(eventImage) {

    if (eventImage.target.files.length > 0) {
      this.UploadMsg = ""
      for (let i = 0; i < eventImage.target.files.length; i++) {
        this.arrImage.push(eventImage.target.files[i])
        this.UploadMsg += eventImage.target.files[i].name
      }

      console.log(this.arrImage)
    }

  }

  cancelBlog() {
    this.elem.nativeElement.value = ""
    this.UploadMsg = "Upload image"
    this.arrImage.pop()
    // delete this.arrImage;
    console.log(this.arrImage.length)
  }

  updateIDBlog(element) {

    console.log(element)
    this.blogIDUbdate = element
  }
  deleteBlog(element) {

    console.log(element)
    this.blogIDdelete = element
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

        this.getblogs();
      },
      error => console.log(error)
    );
  }

  sureDeleteBlog() {
    this.http.post('http://127.0.0.1:8000/Blog/deleteBlog', this.blogIDdelete).subscribe(
      data => {
        if (data['msg'] == 'success') {

          this.getblogs();
        }
      },
      error => console.log(error)
    );
  }

  postBlog(){
    
    const uploadData = new FormData();
//
    
    let userID = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(userID)
    for(let i =0 ; i< this.arrImage.length ; i++){
      uploadData.append('images', this.arrImage[i]);
    }
   
    uploadData.append('userID', userID.userId);
    uploadData.append('title', userID.first_name);
    uploadData.append('published_at',this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    uploadData.append('location',userID.location);
    uploadData.append('body', this.elem.nativeElement.value);


    this.http.post('http://127.0.0.1:8000/Blog/create/', uploadData).subscribe(
      data => {
       this.getblogs();
      },
      error => console.log(error)
    );
  }

  getblogs() {
    let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
    this._apiFindServ.getBlog_with_related_company(
      parseInt(getInfoUserSession['userId'])).subscribe((res) => {
        console.log(res)

        this.alllistBlog = res;

      }, (err) => { console.log(err) })
  }

}
