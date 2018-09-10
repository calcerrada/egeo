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
import { Component } from '@angular/core';
import { StDropDownMenuItem, StDropDownMenuGroup, StDropDownVisualMode } from '@stratio/egeo';

import { StDemoLoggerService } from '../shared/st-demo-logger/st-demo-logger.service';

@Component({
   selector: 'st-dropdown-menu-demo',
   templateUrl: 'st-dropdown-menu-demo.html'
})
export class StDropdownMenuDemoComponent {

   public titles: string[] = [];
   public menus: ((StDropDownMenuItem | StDropDownMenuGroup)[])[] = [];
   public active: boolean[] = [];
   public selectedValue: (StDropDownMenuItem | undefined)[] = [];
   public visualMode: StDropDownVisualMode = StDropDownVisualMode.MENU_LIST;

   constructor(private _logger: StDemoLoggerService) {
      const menus: number = 5;
      this.active = Array.from(Array<boolean>(menus)).map(() => false);
      this.selectedValue = Array.from(Array<StDropDownMenuItem>(menus)).map(() => undefined);

      this.titles = ['Normal', 'With Scroll', 'Large Text', 'Group', 'Group With Scroll'];

      this.menus.push(this.generateNormal());
      this.menus.push(this.generateWithScroll());
      this.menus.push(this.generateLargeText());
      this.menus.push(this.generateGroup());
      this.menus.push(this.generateGroupWithScroll());
   }

   changeActive(position: number): void {
      this.active[position] = !this.active[position];
      this._logger.log('click button and active is: ', this.active[position]);
   }

   onChange(selected: StDropDownMenuItem, position: number): void {
      this.active[position] = false;
      this.selectedValue[position] = selected;
      this._logger.log('select value and hide menu', JSON.stringify(selected));
   }

   getVisualMode(menuId: number): StDropDownVisualMode {
      return menuId % 2 ? StDropDownVisualMode.OPTION_LIST: StDropDownVisualMode.MENU_LIST;
   }

   private generateNormal(): StDropDownMenuItem[] {
      return Array.from(Array<StDropDownMenuItem>(5)).map((_value, i) => ({
         label: `Option ${i}`,
         value: `option-${i}`,
         test: 'test'
      }));
   }

   private generateWithScroll(): StDropDownMenuItem[] {
      return Array.from(Array<StDropDownMenuItem>(20)).map((_value, i) => ({
         label: `Option ${i}`,
         value: `option-${i}`
      }));
   }

   private generateLargeText(): StDropDownMenuItem[] {
      return Array.from(Array<StDropDownMenuItem>(10)).map((_value, i) => ({
         label: i === 3 ? `Option ${i} with large text that not fit in button size` : `Option ${i}`,
         value: `option-${i}`
      }));
   }

   private generateGroup(): StDropDownMenuGroup[] {
      return [
         {title: 'Severity', items: [
            {label: 'Critical Error', value: 'critical'},
            {label: 'Warning', value: 'Warning'}
         ]},
         {title: 'Status', items: [
            {label: 'Active', value: 'active'},
            {label: 'Inactive', value: 'inactive'}
         ]}
      ];
   }

   private generateGroupWithScroll(): StDropDownMenuGroup[] {
      return [
         {title: 'Severity', items: [
            {label: 'Critical Error', value: 'critical'},
            {label: 'Warning', value: 'Warning'}
         ]},
         {title: 'Status', items: [
            {label: 'Active', value: 'active'},
            {label: 'Inactive', value: 'inactive'},
            {label: 'Paused', value: 'paused'},
            {label: 'Stopped', value: 'stopped'},
            {label: 'Running', value: 'running'},
            {label: 'Waiting', value: 'waiting'},
            {label: 'Delayed', value: 'delayed'},
            {label: 'Unknown', value: 'unknown'}
         ]}
      ];
   }
}
