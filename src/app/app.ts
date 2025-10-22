import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./layouts/footer/footer";
import { FlowbiteService } from './core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'e-commerceProject';
    constructor(private readonly flowbiteService: FlowbiteService)  {}
  
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }
}
