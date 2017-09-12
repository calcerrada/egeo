/*
* © 2017 Stratio Big Data Inc., Sucursal en España.
*
* This software is licensed under the Apache License, Version 2.0.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the terms of the License for more details.
*
* SPDX-License-Identifier: Apache-2.0.
*/

import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { StWidgetComponent } from './st-widget.component';

@Component({
   template: `<st-widget></st-widget>`
})
class TestStWidgetComponent { }

let comp: TestStWidgetComponent;
let fixture: ComponentFixture<TestStWidgetComponent>;
let nativeElement: any;
let template: string = '';
let title: string = 'Widget';
let elementId = 'test-id';
function createTestComponent(customTemplate?: string): Promise<ComponentFixture<TestStWidgetComponent>> {
   if (customTemplate) {
      TestBed.overrideComponent(TestStWidgetComponent, {
         set: {
            template: customTemplate
         }
      });
   }
   return TestBed.compileComponents();
}


describe('StWidgetComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StWidgetComponent, TestStWidgetComponent]
      });
   }));


   it('Should init correctly and title are displayed correct', async(() => {
      template = '<st-widget title="' + title + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         fixture.detectChanges();
         nativeElement = fixture.nativeElement;

         expect(nativeElement.querySelector('.st-widget__title').textContent).toContain(title);
      });
   }));


   it('If host element has defined id, Element Id should be the same plus "-widget" sufix', async(() => {
      template = '<st-widget id="' + elementId + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         fixture.detectChanges();
         nativeElement = fixture.nativeElement;

         expect(nativeElement.querySelector('.st-widget').id).toEqual((elementId + '-widget'));
      });
   }));


   it('If host element has not defined id , Element Id should be NULL', async(() => {
      template = '<st-widget></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         fixture.detectChanges();
         nativeElement = fixture.nativeElement;

         expect(nativeElement.querySelector('#' + elementId + '-widget')).toBeNull();
      });
   }));
});
