import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iblog } from 'src/app/models/interfaces/iblog';
import { Icomment } from 'src/app/models/interfaces/icomment';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @Input() url = location.href;
  blogForm: FormGroup;
  UploadMsg: String = "Upload image"
  arrImage: any = []
  isImage: boolean = true
  myDate: Date = new Date();
  blogsList: any[]
  commentList: Icomment[]
  @ViewChild('textarea') elem: ElementRef;
  @ViewChild('check') check: ElementRef;
  loggedIn: boolean = false
  userID: number
  myLike: any
  arrcheck = []

  constructor(private _router: Router, private _apiBlogCatServ: JobServiceService, private http: HttpClient, private formbuilder: FormBuilder, public datePipe: DatePipe) {


  }

  ngOnInit(): void {

    if (sessionStorage.getItem('userInfo')) {
      let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log(getInfoUserSession)
      this.loggedIn = true
      this.userID = getInfoUserSession["userId"]
      this.getMy_likes(this.userID)
    } else { this.loggedIn = false }



  }
  break(item) {
    console.log(item)
    // this.myLike[remove(item)
  }
  blogID(element) {
    console.log(element)
    sessionStorage.setItem('singleBlog', element)
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

    this._apiBlogCatServ.getBlogs().subscribe((res) => {
      console.log(res)
      this.blogsList = res
      this.http.post('http://127.0.0.1:8000/Blog/getlikesBlog_belongUser/', userid).subscribe(
        data => {
          console.log(data)


          this.myLike = data
          if (this.myLike.length > 0) {
            for (let j = 0; j < this.blogsList.length; j++) {
              for (let i = 0; i < this.myLike.length; i++) {


                if (this.blogsList[j].blogID == data[i] && this.blogsList[j].myLiked != true) {
                  console.log(this.blogsList[j])
                  this.blogsList[j].myLiked = true
                  break;
                } else { this.blogsList[j].myLiked = false }
              }
            }
          }else{
            for (let j = 0; j < this.blogsList.length; j++) {
              this.blogsList[j].myLiked  = false}
          }
          console.log(this.blogsList)

          this._router.navigateByUrl('/blog');
        },
        error => console.log(error)
      );

    }, (err) => { console.log(err) })


  }
  postBlog() {

    const uploadData = new FormData();
    let userID = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(userID)
    for (let i = 0; i < this.arrImage.length; i++) {
      uploadData.append('images', this.arrImage[i]);
    }

    uploadData.append('userID', userID.userId);
    uploadData.append('title', userID.first_name);
    uploadData.append('published_at', this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    uploadData.append('location', userID.location);
    uploadData.append('body', this.elem.nativeElement.value);


    this.http.post('http://127.0.0.1:8000/Blog/create/', uploadData).subscribe(
      data => {
        console.log(data)

      },
      error => console.log(error)
    );
  }

}