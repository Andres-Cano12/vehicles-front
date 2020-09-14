import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_URLS, APIENDPOINT } from 'app/config/configuration';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationViewModel } from 'app/shared/models/user/registrationViewModel';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { WebStorageService } from 'app/shared/services/common/webStorage.service';

@Component({
  templateUrl: 'register.component.html',
  providers: [ ToastrService]
})
export class RegisterComponent {
  form: FormGroup;
  serviceError: string;
  isLoaded: boolean = true;
  model: RegistrationViewModel = new RegistrationViewModel();
  showSpinner: boolean = false;
  public get loginUrl() { return AUTH_URLS.LOGIN_URL; }
  constructor(    
     private _router: Router, 
     private _webStorage: WebStorageService,
     private _formBuilder: FormBuilder,
     private _toastrService: ToastrService,
     private _authService: AuthService,
   ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): any {
    this.form = this._formBuilder.group({
      'email': [, [Validators.required, Validators.email]],
      'password': [, [Validators.required, Validators.minLength(6)]]  ,  
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'userName': [null, Validators.required],
    });
  }

  get f() { return this.form.controls; }

  public onSubmit(): void {
    this.showSpinner = true;
    this.isLoaded = false;
    this.serviceError = null;
    this.model = this.form.value as RegistrationViewModel;
    this._authService.create(APIENDPOINT.REGISTER, this.model)
      .subscribe(resp => {

        if(resp != undefined && resp.data != null && resp.data != undefined ) {
          this._toastrService.success("Tu cuenta ha sido creada, ahora puedes ingresar al sistema", '');
          this._webStorage.clearSessionStorage();
          this.showSpinner = false;
          this._router.navigate([this.loginUrl]);
        } else {

          this.showSpinner = false;
          this.isLoaded = true;
          this._toastrService.error(JSON.stringify(resp.header.message), '');
        }


      }, error => {
        this.showSpinner = false;
        this.isLoaded = true;
        this._toastrService.error(JSON.stringify(error.error), '');
      });
  }

  handleClick() {
    this._router.navigate([this.loginUrl]);
  }

}
