import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [ClockComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ClockComponent
  ]
})

export class ClockModule { }
