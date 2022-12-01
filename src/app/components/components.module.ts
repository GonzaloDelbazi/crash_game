import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './modal/modal.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TablePlayersComponent } from './table-players/table-players.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule
    
  ],
  declarations: [
    NavBar,
    ModalComponent,
    TablePlayersComponent
  ],
  exports: [
    NavBar,
    TablePlayersComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
