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
import { ComponentFixture, async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StProgressBarModule } from '../st-progress-bar/st-progress-bar.module';
import { StForegroundNotificationsComponent } from './st-foreground-notifications';
import { StForegroundNotificationsModule } from './st-foreground-notifications.module';

@Component({
   template: `
      <st-foreground-notifications #notification
         [status]="status"
         [text]="text"
         [visible]="visible"
         id="tes-id">
      </st-foreground-notifications>`
})
class TestStFNComponent {
   status: string;
   text: string;
   visible: boolean;
   @ViewChild('notification') dropdownItem: StForegroundNotificationsComponent;
}

let comp: TestStFNComponent;
let fixture: ComponentFixture<TestStFNComponent>;
let nativeElement: HTMLElement;



describe('StForegroundNotificationsComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StForegroundNotificationsModule],
         declarations: [TestStFNComponent]
      }).compileComponents();


   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TestStFNComponent);
      comp = fixture.componentInstance;
      nativeElement = fixture.nativeElement;


   });

   describe('When visible is true ', () => {
      it('And status is defined as default, The element should contain "default" class', async(() => {
         comp.visible = true;
         comp.status = 'default';
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');
         expect(nativeElement.querySelector('.foreground-notification').classList).toContain('default');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('warning');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('success');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('critical');

      }));

      it('And status is defined as default, element should contain "success" class', async(() => {
         comp.visible = true;
         comp.status = 'success';
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');
         expect(nativeElement.querySelector('.foreground-notification').classList).toContain('success');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('warning');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('default');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('critical');


      }));

      it('And status is defined as default, element should contain "warning" class', async(() => {
         comp.visible = true;
         comp.status = 'warning';
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');
         expect(nativeElement.querySelector('.foreground-notification').classList).toContain('warning');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('default');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('success');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('critical');


      }));

      it('And status is defined as default, element should contain "critical" class', async(() => {
         comp.visible = true;
         comp.status = 'critical';
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');
         expect(nativeElement.querySelector('.foreground-notification').classList).toContain('critical');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('warning');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('success');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('default');
      }));

      it('And status is not defined, element should contain "default" class', async(() => {
         comp.visible = true;
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');
         expect(nativeElement.querySelector('.foreground-notification').classList).toContain('default');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('warning');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('success');
         expect(nativeElement.querySelector('.foreground-notification').classList).not.toContain('critical');

      }));

      it('And user click on the close icon, the element should fade out and then hidden', fakeAsync(() => {
         let closeButton: HTMLDivElement = fixture.debugElement.query(By.css('.close')).nativeElement;
         comp.visible = true;
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).toContain('visible');

         closeButton.click();
         fixture.detectChanges();

         expect(nativeElement.querySelector('st-foreground-notifications').classList).not.toContain('visible');



      }));

   });

});
