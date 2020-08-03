import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { MustMatchValidators } from 'src/app/shared/validators/validations.validators';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Global } from 'src/app/shared/global';
import { Globalstatic } from 'src/app/shared/globalstatic';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  message = "";
  

  @ViewChild('ngbTabSet', { static: true }) elngbTabSet: any;

  constructor(
    private _fb: FormBuilder, 
    private _dataService: DataService, 
    private _toastr: ToastrService, 
    private authService: AuthService,
    private httpClient: HttpClient) {

     }

  ngOnInit() {
    // this._toastr.success("Success...", "Login");
    // this._toastr.warning("Warning...", "Login");
    // this._toastr.info("Info...", "Login");
    // this._toastr.error("Error...", "Login");
    this.createLoginForm();
    this.createRegistrationForm();
    
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      userName: [''],
      password: ['']
    });
  }

  createRegistrationForm() {
    this.registerForm = this._fb.group({
      Id: [0],
      UserTypeId: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]      
    },
    {
      validators: MustMatchValidators("password", "confirmPassword")
    });
  }
  get f() { return this.registerForm.controls; }

  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId === 'logintab') {
       // event.preventDefault();
    }

  }
  onLoginSubmit(formData: any) {
    if (this.loginForm.valid) {
      // this.httpClient.get('../../../../assets/stubs/login.json').subscribe(
       this._dataService.post(Global.BASE_USER_ENDPOINT + 'UserMaster/Login/', this.loginForm.value).subscribe(
        loginData => {
          if (loginData.isSuccess) {
            this.authService.login(loginData.data);
            this.message = this.authService.getMessage();
            this._toastr.success('Login Success !!', 'Login');
            this.reset();
          } else {
            this._toastr.error(this.message, 'Login');
          }
        }
      );
    } else {
      this._toastr.error('Please enter valid Username & Password', 'Login');
    }
  }
  reset() {
    this.loginForm.controls['userName'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }

  onSubmit(formData: any) {
   // debugger;
    this.submitted = true;

    if (this.registerForm.valid) {
      this.registerForm.controls["Id"].setValue(0);
      this.registerForm.controls["UserTypeId"].setValue(Globalstatic.Saller);

      this._dataService.post(Global.BASE_USER_ENDPOINT + "UserMaster/Save/", formData.value).subscribe(
        data => {
          if (data.isSuccess) {
            this._toastr.success("Data Saved Successfully !!", "Registration");
            this.registerForm.reset();
            this.elngbTabSet.select('logintab');
          }
        });
    } else {
      this._toastr.error("Error Occured !!", "Registration");
    }
  }
}
