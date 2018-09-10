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
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StFullscreenLayoutComponent } from './st-fullscreen-layout';
import { StWindowRefService } from '../utils/window-service';

// Component

describe('StFullscreenLayoutComponent', () => {

   let comp: StFullscreenLayoutComponent;
   let fixture: ComponentFixture<StFullscreenLayoutComponent>;
   let fakeWindowRefService: any;

   class FakeWindowRefService {
      get nativeWindow(): any {
         return window;
      }
   }

   beforeEach(async(() => {
      fakeWindowRefService = new FakeWindowRefService();

      TestBed.configureTestingModule({
         providers: [
            { provide: StWindowRefService, useValue: fakeWindowRefService }
         ],
         declarations: [StFullscreenLayoutComponent],
         schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFullscreenLayoutComponent);
      comp = fixture.componentInstance;
   });

   it('should be initialized', () => {
      comp.title = 'test';
      fixture.detectChanges();

      const element: HTMLParagraphElement = fixture.debugElement.query(By.css('.title')).nativeElement;

      expect(element.innerText).toEqual('test');
   });

   it('it should disable scroll to body in order not to see the content of the previous page', () => {
      expect(window.document.body.style.overflow).toEqual('hidden');

      comp.ngOnDestroy();

      expect(fakeWindowRefService.nativeWindow.document.body.overflow).toBeUndefined();
   });
});
