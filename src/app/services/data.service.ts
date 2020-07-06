import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/users', user);
  }
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(this.baseUrl + '/users/' + id, user);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }

}