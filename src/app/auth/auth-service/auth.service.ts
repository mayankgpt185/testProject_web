import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { GlobalApiService } from 'src/app/GlobalAPIService/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri: any;
  customerId: any;


  constructor(private http: HttpClient, private router: Router) {
    this.uri = GlobalApiService.apiURL;

   }

  checkEmailDuplication(email) {
    return this.http.get<any>(`${this.uri}/signUp/checkEmailDuplication/` + email)
  }

  Login(email, password) {
    const obj = {
      email,
      password,
    };
    return this.http.post<any>(`${this.uri}/signin`, obj)
  }

  getAllEmployee() {
    return this.http.get<any>(`${this.uri}/emp/getAllEmployee` )
  }

  signUp(signupInfo) {
    return this.http.post<any>(`${this.uri}/signUp/register`, signupInfo)
  }

  deleteEmployee(employeeSkey) {
    return this.http.post<any>(`${this.uri}/emp/deleteEmployee`, employeeSkey)
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  saveEmployee(formData){
    return this.http.post<any>(`${this.uri}/emp/createEmployee`, formData)
  }

}
