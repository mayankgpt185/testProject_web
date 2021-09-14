import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = true;

  dailySessionInfo = {
    customerId: "",
    firstName: "",
    lastName: "",
    signIn: "",
    currentStatus: "",
    lastModifiedOn: "",
    comingFrom: "",
    ipAddress: "",
    sessionId: "",
    countryCode: ""
  }

  signinInfo = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  }

  constructor(private router: Router, private authServicesService: AuthService) { }

  ngOnInit(): void {
  }

  restmsg() {
    this.login = true;
  }

  redirectToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  saveUser(signinForm: NgForm) {
    this.authServicesService.Login(this.signinInfo.email, this.signinInfo.password)
      .subscribe(data => {
        console.log(data,"data");
        
        if (data != null && data != undefined && data != "") {
          sessionStorage.setItem("firstName", data.firstName);
          sessionStorage.setItem("lastName", data.lastName);
          sessionStorage.setItem('tokenNo', data.tokenNo); 
          if(sessionStorage.getItem('tokenNo')!=null || sessionStorage.getItem('tokenNo')!="" ||sessionStorage.getItem('tokenNo')!=undefined){
            this.router.navigate(['/home']);
          }
        } else {
          // this.login = false;
          // Toast.fire({
          //   icon: 'error',
          //   title: 'Login Failed'
          // })
        }
      });
  }

}
