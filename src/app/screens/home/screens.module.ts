import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// COMPONENTS
import { HomeComponent } from './home.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
	imports: [
		CommonModule,
    ComponentsModule,
    MatButtonModule
	],
  declarations: [
    HomeComponent
  ]
})
export class ScreenModule { }