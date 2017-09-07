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
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { RouterStub } from '../../tests/router-stub';
import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StHeaderMenuOptionComponent } from './menu-option';
import { StHeaderMenuOption } from '../st-header.model';

let fakeMenu: StHeaderMenuOption = {
   icon: 'icon-check',
   label: 'TEST',
   link: 'fakePath',
   subMenus: []
};

let fakeMenuWithSubmenu: StHeaderMenuOption = {
   icon: 'icon-check',
   label: 'TEST',
   link: 'fakePath',
   subMenus: [{ label: 'submenu1 label', link: 'submenu1' }]
};

let comp: StHeaderMenuOptionComponent;
let fixture: ComponentFixture<StHeaderMenuOptionComponent>;
let de: DebugElement;

describe('StHeaderComponent', () => {
   describe('StHeaderMenuOptionComponent', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StHeaderMenuOptionComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
               { provide: Router, useClass: RouterStub }
            ]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StHeaderMenuOptionComponent);
         comp = fixture.componentInstance;
      });

      it('should be initialized correctly without submenu', () => {
         comp.option = fakeMenu;
         comp.showMenuName = true;

         fixture.detectChanges();

         expect(comp.qaId).toContain(fakeMenu.label.toLowerCase());
         expect(comp.hasSubmenu).toBeFalsy();
         expect(comp.submenuList).toEqual([]);
      });


      it('should be initialized correctly with submenu', () => {
         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;

         fixture.detectChanges();

         let expectedSubmenuList: StDropDownMenuItem[] = [{
            label: fakeMenuWithSubmenu.subMenus[0].label,
            value: fakeMenuWithSubmenu.subMenus[0].link,
            selected: false
         }];

         expect(comp.qaId).toContain(fakeMenu.label.toLowerCase());
         expect(comp.hasSubmenu).toBeTruthy();
         expect(comp.submenuList).toEqual(expectedSubmenuList);
      });

       it('should be initialized correctly with submenu elements and one active', inject([Router], (router: RouterStub)  => {
         let expectedSubmenuList: StDropDownMenuItem[] = [{
            label: fakeMenuWithSubmenu.subMenus[0].label,
            value: fakeMenuWithSubmenu.subMenus[0].link,
            selected: true
         }];

         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;
         fixture.detectChanges();

         expect(comp.qaId).toContain(fakeMenu.label.toLowerCase());
         expect(comp.hasSubmenu).toBeTruthy();

         router.launchNewEvent(new NavigationEnd(0, 'submenu1', 'submenu1'));

         expect(comp.submenuList).toEqual(expectedSubmenuList);
      }));

      it('should open submenu dropdown', () => {
         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;

         fixture.detectChanges();

         let expectedSubmenuList: StDropDownMenuItem[] = [{
            label: fakeMenuWithSubmenu.subMenus[0].label,
            value: fakeMenuWithSubmenu.subMenus[0].link,
            selected: false
         }];

         let arrow: HTMLElement = fixture.debugElement.query(By.css('.sth-header-menu-option-arrow')).nativeElement;
         arrow.click();
         fixture.detectChanges();

         expect(comp.isActive).toBeTruthy();
      });

      it('should select a submenu', () => {
         let responseFunction = jasmine.createSpy('response');
         comp.selectMenu.subscribe(responseFunction);
         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;

         fixture.detectChanges();
         let arrow: HTMLElement = fixture.debugElement.query(By.css('.sth-header-menu-option-arrow')).nativeElement;
         arrow.click();
         fixture.detectChanges();

         expect(comp.isActive).toBeTruthy();
         comp.changeOption(comp.submenuList[0]);
         fixture.detectChanges();

         expect(comp.isActive).toEqual(false);
         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledWith(comp.submenuList[0].value);
      });

       it('should update the active menu option in navigation event', inject([Router], (router: RouterStub) => {
          let expectedSubmenuList: StDropDownMenuItem[] = [{
            label: fakeMenuWithSubmenu.subMenus[0].label,
            value: fakeMenuWithSubmenu.subMenus[0].link,
            selected: false
         }];
         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;

         fixture.detectChanges();
         expect(comp.submenuList).toEqual(expectedSubmenuList);

         router.launchNewEvent(new NavigationStart(0, 'submenu1'));
         fixture.detectChanges();
         expect(comp.submenuList).toEqual(expectedSubmenuList);

         router.launchNewEvent(new NavigationEnd(0, 'submenu1', 'submenu1'));
         fixture.detectChanges();
         expectedSubmenuList[0].selected = true;
         expect(comp.submenuList).toEqual(expectedSubmenuList);
      }));
       it('should be destroyed without subscription', inject([Router], (router: RouterStub) => {
         comp.option = fakeMenuWithSubmenu;
         comp.showMenuName = true;

         fixture.detectChanges();
         expect(comp.isActive).toBeFalsy();

         router.closeSubscriptions();
         comp.ngOnDestroy();
         fixture.detectChanges();

         expect(comp.isActive).toBeFalsy();
      }));
   });
});
