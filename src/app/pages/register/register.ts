import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{

  private readonly authService = inject(AuthService)
  private readonly router= inject(Router)
  errMsg:string = ''
  isRegistered:string=''
  isLoading:boolean = false
  showPass:boolean = false
  showRePass :boolean =false
  signUpForm!:FormGroup

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm():void{

    this.signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^.{8,}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(01[0125])\d{8}$/)])
  }, {validators: this.confirmPass})
  }


  confirmPass(formGrp:AbstractControl){
    return formGrp.get('password')?.value === formGrp.get('rePassword')?.value ? null : {mismatch:true}
  }


  submit():void{
    if (this.signUpForm.valid) {
      this.isLoading = true
      this.authService.register(this.signUpForm.value).subscribe({

        next: (res)=>{
          this.errMsg=''
          this.isRegistered = res.message
          if(res.message === 'success'){
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 2500);
          }
        },
        error: (err)=>{
          this.errMsg = err.error.message
          this.isLoading=false
        }
      })
    }else{
      this.signUpForm.markAllAsTouched();
    }
}




}
