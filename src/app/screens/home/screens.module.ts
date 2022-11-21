import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { HomeComponent } from './home.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
	imports: [
		CommonModule,
    ComponentsModule
	],
  declarations: [
    HomeComponent
  ]
})
export class ScreenModule { }