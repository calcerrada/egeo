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
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StProgressBarModule } from '../st-progress-bar/st-progress-bar.module';
import { StWidgetComponent } from './st-widget.component';

@Component({
   template: `<st-widget></st-widget>`
})
class TestStWidgetComponent { }

let comp: TestStWidgetComponent;
let fixture: ComponentFixture<TestStWidgetComponent>;
let nativeElement: any;
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
         imports: [StProgressBarModule],
         declarations: [StWidgetComponent, TestStWidgetComponent]

      });
   }));


   it('Should init correctly and title are displayed correct', async(() => {
      let template = '<st-widget title="' + title + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();

         expect(nativeElement.querySelector('.st-widget__title').textContent).toContain(title);
      });
   }));
   describe('while loading data', () => {

      it('loading status elements with default test should be displayed', async(() => {
         let template = '<st-widget [loading]="true" ></st-widget>';

         createTestComponent(template).then(() => {
            fixture = TestBed.createComponent(TestStWidgetComponent);
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            expect(nativeElement.querySelector('.loading-status')).not.toBeNull();
            expect(nativeElement.querySelector('.loading-status-text').textContent).toContain('Loading data');

            expect(nativeElement.querySelector('.st-widget__content')).toBeNull();
         });
      }));

      it('if overwriteLoadingData is defined, text "Loading data" should be overwritten', async(() => {
         let template = '<st-widget [loading]="true" overwriteLoadingData="fake" ></st-widget>';

         createTestComponent(template).then(() => {
            fixture = TestBed.createComponent(TestStWidgetComponent);
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            expect(nativeElement.querySelector('.loading-status')).not.toBeNull();
            expect(nativeElement.querySelector('.loading-status-text').textContent).toContain('fake');

            expect(nativeElement.querySelector('.st-widget__content')).toBeNull();
         });
      }));



   });

   it('when loaded, content widget should be displayed', async(() => {
      let template = '<st-widget [loading]="false" ></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();

         expect(nativeElement.querySelector('.loading-status')).toBeNull();
         expect(nativeElement.querySelector('.st-widget__content')).not.toBeNull();
      });
   }));

   it('If host element has defined id, Element Id should be the same plus "-widget" sufix', async(() => {
      let template = '<st-widget id="' + elementId + '" ></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();

         expect(nativeElement.querySelector('.st-widget').id).toEqual((elementId + '-widget'));
      });
   }));

   it('when element is initilialized, both draggable and dragging variable are false', async(() => {
      let template = '<st-widget id="' + elementId + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();

         expect(nativeElement.draggable).toBeFalsy();
         expect(nativeElement.dragging).toBeFalsy();
      });
   }));

   it('when we interact with mouse event , draggable variable should change its value', async(() => {
      let template = '<st-widget id="' + elementId + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();
         let el = fixture.debugElement.query(By.css('.st-widget'));

         el.triggerEventHandler('mousedown', nativeElement.draggable = true);
         expect(nativeElement.draggable).toBeTruthy();

         el.triggerEventHandler('mousedup', nativeElement.draggable = false);
         expect(nativeElement.draggable).toBeFalsy();
      });
   }));

   it('when we interact with drag event, dragging variable should change its value', async(() => {
      let template = '<st-widget id="' + elementId + '"></st-widget>';

      createTestComponent(template).then(() => {
         fixture = TestBed.createComponent(TestStWidgetComponent);
         nativeElement = fixture.nativeElement;
         fixture.detectChanges();
         let el = fixture.debugElement.query(By.css('.st-widget'));

         el.triggerEventHandler('dragstart', nativeElement.dragging = true);
         expect(nativeElement.dragging).toBeTruthy();

         el.triggerEventHandler('dragend', nativeElement.dragging = false);
         expect(nativeElement.dragging).toBeFalsy();
      });
   }));
});
