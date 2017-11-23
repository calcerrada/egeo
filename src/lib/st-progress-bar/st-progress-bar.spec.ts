/*
* © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
*
* This software – including all its source code – contains proprietary
* information of Stratio Big Data Inc., Sucursal en España and
* may not be revealed, sold, transferred, modified, distributed or
* otherwise made available, licensed or sublicensed to third parties;
* nor reverse engineered, disassembled or decompiled, without express
* written authorization from Stratio Big Data Inc., Sucursal en España.
*/
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StProgressBarComponent } from './st-progress-bar';


let fixture: ComponentFixture<StProgressBarComponent>;
let component: StProgressBarComponent;
let nativeElement: HTMLElement;

describe('ProgressBar', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StProgressBarComponent]
      }).compileComponents();
   }));


   describe('when init component', () => {

      beforeEach(() => {
         fixture = TestBed.createComponent(StProgressBarComponent);
         component = fixture.componentInstance;
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();
      });

      it('should be add two elements with progress-bar class name', () => {
         const progressElement = nativeElement.querySelectorAll('.progress-bar');
         expect(progressElement.length).toBe(2);
      });

      it('the first element should have a progress-bar-primary class', () => {
         const progressElement = nativeElement.querySelector('.progress-bar-primary');
         expect(progressElement).toBeDefined();
      });

      it('the second element should have a progress-bar-secondary class', () => {
         const progressElement = nativeElement.querySelector('.progress-bar-secondary');
         expect(progressElement).toBeDefined();
      });

   });
});

