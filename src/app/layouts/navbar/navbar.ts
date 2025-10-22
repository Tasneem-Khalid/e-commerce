import { Component, inject, Input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  private readonly cookies= inject(CookieService)
  private readonly auth = inject(AuthService)

  constructor(private readonly flowbiteService: FlowbiteService)  {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  @Input({required:true}) isLogin!:boolean

  signOut():void{

    this.auth.signOut()

  }


}
