import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  blogForm:FormGroup;
  UploadMsg: String = "Upload image"
  arrImage :any = []
  isImage :boolean = true
  myDate: Date = new Date();
  blogsList :Iblog[]
  commentList:Icomment[]
  @ViewChild('textarea') elem: ElementRef;
  constructor( private _apiBlogCatServ: JobServiceService, private http: HttpClient,private formbuilder: FormBuilder, public datePipe: DatePipe) {

    
   }

  ngOnInit(): void {
    
    this._apiBlogCatServ.getBlogs().subscribe((res) => {
        console.log(res)  
        this.blogsList = res
        
      }, (err) => { console.log(err) })
  }

  blogID(element){
    console.log(element)
    sessionStorage.setItem('singleBlog' , element)
  }
  preview(eventImage){
    

    if(eventImage.target.files.length > 0){
      this.UploadMsg=""
      for(let i =0; i< eventImage.target.files.length ;i++ )
      {
        this.arrImage.push(eventImage.target.files[i])
        this.UploadMsg +=eventImage.target.files[i].name
      }
      
      console.log(this.arrImage)
    }
    
  }
  cancelBlog(){
    this.elem.nativeElement.value = ""
    this.UploadMsg = "Upload image"
    this.arrImage.pop()
   // delete this.arrImage;
    console.log(this.arrImage.length)
  }
  postBlog(){
    
    const uploadData = new FormData();
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
        console.log(data)
        // if (data['msg'] == 'success'){
        // alert('check your email and press on link to active your account')
        // window.location.href = 'http://localhost:4200/login';
        // }else{ alert(data['msg'])}
      },
      error => console.log(error)
    );
  }

}