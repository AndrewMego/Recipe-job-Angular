import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Iblog } from 'src/app/models/interfaces/iblog';
import { Icomment } from 'src/app/models/interfaces/icomment';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
blogItem :Iblog
@ViewChild('textComment') elem: ElementRef;
getsingleBlog:Icomment
myDate: Date = new Date();
  constructor(private _router: Router, private _apiBlogCatServ: JobServiceService , public datePipe: DatePipe) { }

  ngOnInit(): void {
   this.getobj();
   
  }
  sendComment(){
    if(sessionStorage.getItem('userInfo')){
     
     
    
    let getInfoUserSession = JSON.parse(sessionStorage.getItem('userInfo'))
    if(this.elem.nativeElement.value != '')
    {

      console.log(this.elem.nativeElement.value)
      let getsingleIDBlog = sessionStorage.getItem('singleBlog')
  
      this.getsingleBlog={'commentString':this.elem.nativeElement.value , 
                          'published_at' :this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
                          'userID': getInfoUserSession['userId'],
                          'blogID':  parseInt(getsingleIDBlog) }
      
      console.log(this.getsingleBlog)
      this._apiBlogCatServ.sendComment(this.getsingleBlog).subscribe((res) => {
        console.log(res)  
       this.getobj();
        
      }, (err) => { console.log(err) })

    }
  }else{ this._router.navigateByUrl('/login');}
  }
  getobj(){

    let getsingleBlog = sessionStorage.getItem('singleBlog')
    console.log(getsingleBlog)
    this._apiBlogCatServ.getOneBlog(parseInt(getsingleBlog)).subscribe((res) => {
      console.log(res)  
      this.blogItem = res
      
    }, (err) => { console.log(err) })
  }

}
