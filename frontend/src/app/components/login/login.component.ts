import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5)]]
  })


  authService = inject(AuthService);
  router = inject(Router);
    login(){
      this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((result:any) => {
        alert("User Logged in.");
        localStorage.setItem("token", result.token);
         localStorage.setItem("user", JSON.stringify(result.user));
         this.router.navigateByUrl("/");
      })
    }

    
}
