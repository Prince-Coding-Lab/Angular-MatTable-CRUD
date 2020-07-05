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
    getUses(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + '/users');
      }
    
}