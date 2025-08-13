import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5)]]
  })

  toastr = inject(ToastrService)
  authService = inject(AuthService);
  router = inject(Router);

  register(){
    let value = this.registerForm.value;
    this.authService.register(value.name!, value.email!, value.password!).subscribe(result => {
     // alert("User Registered.");
       this.toastr.success('User Registered.', 'Success');
      this.router.navigateByUrl('/login');
    })
  }
}
