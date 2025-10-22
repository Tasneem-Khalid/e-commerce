import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  private readonly authService = inject(AuthService)
  private readonly router= inject(Router)
  private readonly cookies = inject(CookieService)
  errMsg:string = ''
  isLoading:boolean = false
  showPass:boolean= false

  loginForm!:FormGroup

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm():void{

    this.loginForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/)]),

  })
  }

  submit():void{
    if (this.loginForm.valid) {
      this.isLoading = true
      this.authService.login(this.loginForm.value).subscribe({

        next: (res)=>{
          this.errMsg=''
          if(res.message === 'success'){

            this.cookies.set('userToken', res.token)


            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 1000);
          }
        },
        error: (err)=>{
          console.log(err);
          this.errMsg = err.error.message
          this.isLoading=false
        }
      })
    }
}

}
