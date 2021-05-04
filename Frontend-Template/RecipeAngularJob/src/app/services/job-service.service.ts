import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iaplay } from '../models/interfaces/iaplay';
import { Iblog } from '../models/interfaces/iblog';
import { Icomment } from '../models/interfaces/icomment';
import { Idata } from '../models/interfaces/idata';
import { Ifind } from '../models/interfaces/ifind';
import { Ijob } from './../models/interfaces/ijob';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private http: HttpClient) { }

  getTag(): Observable<Idata[]> {
    return this.http.get<Idata[]>('http://127.0.0.1:8000/Job/addJob/getTag/');
  }

  getCat(): Observable<Idata[]> {
    return this.http.get<Idata[]>('http://127.0.0.1:8000/Job/addJob/getCat/');
  }

  getBlogs(): Observable<Iblog[]> {
    return this.http.get<Iblog[]>('http://127.0.0.1:8000/Blog/getBlog');
  }

  getOneBlog(item : Number): Observable<Iblog> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Iblog>('http://127.0.0.1:8000/Blog/getOneBlog', item, httpOptions)
  }

  sendAply(item : any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<any>('http://127.0.0.1:8000/Job/acceptUser_ForJob/', item, httpOptions)
  }

  postJob(objJob: Ijob): Observable<Ijob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob>('http://127.0.0.1:8000/Job/addJob', objJob, httpOptions)
  }

  

  postTag(objTag: Idata): Observable<Idata> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Idata>('http://127.0.0.1:8000/Job/addJob/jobDetails/', objTag, httpOptions)
  }

  postCat(objCat) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post('http://127.0.0.1:8000/Job/addCat/', objCat, httpOptions)
  }

  findJob(objFind: Ifind): Observable<Ijob[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob[]>('http://127.0.0.1:8000/Job/search/', objFind, httpOptions)
  }

  getJobrelatedCategory(item : Number): Observable<Ijob[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob[]>('http://127.0.0.1:8000/Job/getjob_with_related_Job/', item, httpOptions)
  }

  getjob_with_related_company(item : Number): Observable<Ijob[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob[]>('http://127.0.0.1:8000/Job/getjob_with_related_company/', item, httpOptions)
  }
  getjob_with_related_ApplayingUser(item : Number): Observable<Ijob[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob[]>('http://127.0.0.1:8000/Job/getjob_with_related_ApplayingUser/', item, httpOptions)
  }

  getj_ApplayingUser_with_relatedCompany(item : Number): Observable<Iaplay[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Iaplay[]>('http://127.0.0.1:8000/Job/getj_ApplayingUser_with_relatedCompany/', item, httpOptions)
  }

  getBlog_with_related_company(item : Number): Observable<Iblog[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Iblog[]>('http://127.0.0.1:8000/Blog/getBlog_with_related_company/', item, httpOptions)
  }
  
  getJobInfo(item : Number): Observable<Ijob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob>('http://127.0.0.1:8000/Job/jobInfo/', item, httpOptions)
  }


  sendComment(item : any): Observable<Iblog> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Iblog>('http://127.0.0.1:8000/Blog/sendComment/', item, httpOptions)
  }
  
}
