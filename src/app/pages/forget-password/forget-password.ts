import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword implements OnInit{

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  steps:number = 1;

  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPassword!:FormGroup

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm():void{

    this.verifyEmail= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])

  })
    this.verifyCode= new FormGroup({
    resetCode: new FormControl('', [Validators.required])

  })

    this.resetPassword= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/)]),

  })


  }

  emailVerification(){
    if(this.verifyEmail.valid){

      this.authService.verifyUserEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{

          this.steps=2
        }
      })

    }

  }

  otpVerification(){
    if(this.verifyCode.valid){

      this.authService.verifyOTP(this.verifyCode.value).subscribe({
        next:(res)=>{

          this.steps=3
        }
      })

    }

  }

  newPassword(){
    if(this.resetPassword.valid){

      this.authService.resetUserPassword(this.resetPassword.value).subscribe({
        next:(res)=>{

          this.router.navigate(['/home'])
        }
      })

    }

  }

}
