import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  postCat(objCat: Idata): Observable<Idata> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    
    return this.http.post<Ijob>('http://127.0.0.1:8000/Job/addJob/addCat', objCat, httpOptions)
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
  
}
