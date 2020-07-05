import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService{
    baseUrl = 'https://jsonplaceholder.typicode.com';
    constructor(private http: HttpClient) { }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + '/users');
      }
      addUser(user:User): Observable<any> {
        return this.http.post(this.baseUrl + '/users',user);
      }
    
}