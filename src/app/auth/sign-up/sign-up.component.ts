import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  duplicate: boolean;

  signupInfo: any = {
    email: "",
    firstName: "",
    lastName: "",
    newPassword: "",
    password: "",
    mobile: "",
    // mobileCountryCode: "",
    // countryCode: "",
    dob: ""
  }

  constructor(private router: Router, private authServicesService: AuthService) { }

  ngOnInit(): void {
    this.duplicate = false;
  }

  checkEmailDuplication() {
    this.duplicate = false;
    let resp = this.authServicesService.checkEmailDuplication(this.signupInfo.email);
    resp.subscribe((data) => {
      console.log(data,"*/*");
      
      if (data == 0) {
        console.log(data,"****");
        this.duplicate = true;
      }
    });
  }

  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }

  redirectToSignIn(){
    this.router.navigate(['/login']);
  }

  saveUser(signupForm: NgForm) {
    // this.submitFlg = true;
    this.signupInfo.email = this.signupInfo.email;
    this.signupInfo.firstName = this.signupInfo.firstName;
    this.signupInfo.lastName = this.signupInfo.lastName;
    this.signupInfo.password = this.signupInfo.newPassword;
    // this.signupInfo.mobileCountryCode = this.signupInfo.mobileCountryCode;
    this.signupInfo.mobile = this.signupInfo.mobile;
    this.signupInfo.dob = this.signupInfo.dob;
    this.signupInfo.address = this.signupInfo.address;
    let resp = this.authServicesService.signUp(this.signupInfo);
    resp.subscribe((data) => {
      signupForm.reset();
      // this.submitFlg = false;
      this.authServicesService.redirectToLogin();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have registered successfully!',
        showConfirmButton: false,
        timer: 4500
      })
    });

  }

  show_button: Boolean = false;
  show_confirmbutton: Boolean = false;
  show_eye: Boolean = false;
  show_eye1: Boolean = false;

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  showconfirmPassword() {
    this.show_confirmbutton = !this.show_confirmbutton;
    this.show_eye1 = !this.show_eye1;
  }

}
