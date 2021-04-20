import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../models/interfaces/iuser';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  //private messageSource = new BehaviorSubject('isRefresh');
  //public currentMessageSubscriber = this.messageSource.asObservable();


  // notify(message: any) {
  //   this.messageSource.next(message)
  // }

  userLogin(objLogin: Iuser): Observable<Iuser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Iuser>('http://127.0.0.1:8000/Users/User/login/', objLogin, httpOptions)
  }


  userRegister(objRegister: Iuser): Observable<Iuser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': ' */*'
        //  ,'Authorization': 'my-auth-token'
      })
    };
    console.log(objRegister)
    return this.http.post<Iuser>('http://127.0.0.1:8000/Users/register', objRegister, httpOptions)
  }



}
