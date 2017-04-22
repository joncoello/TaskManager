import { Component } from '@angular/core';

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
    public pageTitle: string = 'Login';
}