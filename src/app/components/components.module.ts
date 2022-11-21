import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    NavBar,
    ModalComponent
  ],
  exports: [
    NavBar,
    ModalComponent
  ]
})
export class ComponentsModule { }
