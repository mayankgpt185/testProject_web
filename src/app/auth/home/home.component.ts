import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth-service/auth.service';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  hideShowFlg = false;
  p = 1;

  employeeData: any = [];

  showData = {
    //rows Per Page
    rowsPerPage: 5
  };

  formData = {
    firstName: "",
    lastName: "",
    mobile: "",
    city: "",
    dob: "",
    address: "",
    employeeSkey: ""
  };
  btnName: string;
  editMode: any;

  constructor(private router: Router, private authServicesService: AuthService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.btnName = "Save";
    this.editMode = 0;
  }

  hideShow(flg) {
    if (flg == '1') {
      this.hideShowFlg = true;
    } else {
      this.hideShowFlg = false;
    }
  }

  saveUser(createUserForm: NgForm) {
    if (this.editMode == 0) {
      this.saveEmployee();
      createUserForm.resetForm();
    }
    else {
      Swal.fire({
        text: "update employee!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
          this.saveEmployee();
          createUserForm.resetForm();
      });

    }
  }

  saveEmployee() {
    // console.log(this.formData,"859");
    
    let resp = this.authServicesService.saveEmployee(this.formData)
    resp.subscribe((data) => {
      this.getAllEmployee();
      this.editMode = 0;
      this.btnName = "Save"
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

  getAllEmployee() {
    this.employeeData = [];
    let resp = this.authServicesService.getAllEmployee()
    resp.subscribe((data) => {
      this.employeeData = data;
      console.log(data);

    });
  }

  editUserInfo(data, index) {
    this.clear();
    this.hideShowFlg = true;
    this.editMode = 1;
    this.formData.employeeSkey = data.employeeSkey;
    this.formData.firstName = data.firstName;
    this.formData.lastName = data.lastName;
    this.formData.mobile = data.mobile;
    this.formData.dob = data.dob;
    this.formData.address = data.address;
    this.formData.city = data.city;
    this.btnName = "Edit";
  }

  clear() {
    this.formData.firstName = "";
    this.formData.lastName = "";
    this.formData.mobile = "";
    this.formData.dob = "";
    this.formData.city = "";
    this.formData.address = "";
  }

  activeAndDeactive(skey) {
    Swal.fire({
      text: "Delete employee!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result) {
        let resp = this.authServicesService.deleteEmployee(skey)
        resp.subscribe((data) => {
          // this.employeeData = data;
          console.log(data, "///");
          this.getAllEmployee();

        });
      }
    });

  }





}
