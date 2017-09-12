import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StDemoGeneratorModule, StWidgetModule } from '@stratio/egeo';

import { StWidgetDemoComponent } from './st-widget-demo.component';

@NgModule({
   imports: [
      CommonModule,
      StWidgetModule,
      StDemoGeneratorModule.withComponents({ components: [StWidgetDemoComponent] })
   ],
   declarations: [StWidgetDemoComponent]
})
export class StWidgetDemoModule { }
