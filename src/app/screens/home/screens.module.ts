import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// COMPONENTS
import { HomeComponent } from './home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	imports: [
		CommonModule,
    ComponentsModule,
    MatButtonModule,
    FormsModule,
    MatSliderModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule
	],
  declarations: [
    HomeComponent
  ]
})
export class ScreenModule { }