import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
            
            
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
`
})
export class LoginComponent {

    public myForm: FormGroup;
    public userNameField: FormControl;
    public passwordField: FormControl;

    public pageTitle: string = 'Login';

    constructor(private loginService: LoginService, private fb: FormBuilder) {
        this.userNameField = new FormControl('', Validators.required);
        this.passwordField = new FormControl('', Validators.required);
        this.myForm = this.fb.group({
            'userName': this.userNameField,
            'password': this.passwordField
        });
    }

    public onSubmit(loginModel: any) {
        console.log(loginModel);
    }

}