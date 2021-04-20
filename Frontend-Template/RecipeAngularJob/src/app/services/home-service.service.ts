import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idata } from '../models/interfaces/idata';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }
  getData(): Observable<Idata[]> {
    return this.http.get<Idata[]>('http://127.0.0.1:8000/Job/addJob/getLoc/');
  }

  getInfoCat(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/Job/getInfoCat/');
  }
  
  allJobs(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/Job/allJobs/');
  }
  getCompany(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/Users/getCompany/');
  }
}
