import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { LoginModel } from './login.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    template: `
    <form   id="login"
                [formGroup]="myForm"
                (ngSubmit)="onSubmit(myForm.value)">
            
            <div class="form-group">
                <label for="userNameInput">Username</label>
                <input  class="form-control"
                        type="text"
                        id="userNameInput"
                        placeholder="username"
                        [formControl]="myForm.controls['userName']">
            </div>

            <div class="form-group">
                <label for="passwordInput">Password</label>
                <input  class="form-control"
                        type="password"
                        id="passwordInput"
                        placeholder="password"
                        [formControl]="myForm.controls['password']">
            </div>
            
            <div *ngIf="isOK" class="alert alert-success" role="alert">{{responseText}}</div>
            <div *ngIf="isError" class="alert alert-danger" role="alert">{{responseText}}</div>
            
            <button [disabled]="loginButtonDisabled" class="btn btn-primary" type="submit">Login</button>
        </form>
`
})
export class LoginComponent {

    public myForm: FormGroup;
    public userNameField: FormControl;
    public passwordField: FormControl;
    public grantTypeField: FormControl;

    public pageTitle: string = 'Login';
    public isOK: boolean;
    public isError: boolean;
    public loginButtonDisabled: boolean;
    public responseText: string;

    constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
        this.userNameField = new FormControl('', Validators.required);
        this.passwordField = new FormControl('', Validators.required);
        this.grantTypeField = new FormControl('password', Validators.required);
        this.myForm = this.fb.group({
            'userName': this.userNameField,
            'password': this.passwordField,
            'grant_type': this.grantTypeField
        });
    }

    public onSubmit(loginModel: LoginModel) {
        this.responseText = '';
        this.loginButtonDisabled = true;
        this.isOK = false;
        this.isError = false;
        console.log(loginModel);
        var formUrl = 'username=' + loginModel.userName + '&password=' + loginModel.password + '&grant_type=password';
        this.loginService.login(formUrl,
            (ok: boolean) => {
                this.loginButtonDisabled = false;
                this.isOK = ok;
                this.isError = !ok;
                console.log(this.loginService.tokenData);
                if (ok) {
                    this.responseText = this.loginService.tokenData.access_token;
                    this.router.navigate(['/about']);
                } else {
                    this.responseText = 'login failed';
                }
            }
        );
    }

}