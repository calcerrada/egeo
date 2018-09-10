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
import * as _ from 'lodash';
import {
   StTwoListSelectionElement,
   StTwoListSelectionConfig,
   EgeoResolveService,
   StTwoListSelectExtraLabelAction,
   StDropDownMenuItem
} from '@stratio/egeo';

@Component({
   selector: 'two-list-selection-demo',
   templateUrl: './st-two-list-selection-demo.html',
   styleUrls: ['./st-two-list-selection-demo.scss']
})

export class StTwoListSelectionDemoComponent {

   completeUserList: Array<StTwoListSelectionElement> = [];
   selectedUserList: Array<StTwoListSelectionElement> = [];
   itemAll: StTwoListSelectionElement;

   config: StTwoListSelectionConfig = {
      allElementsListTitle: 'All element',
      allElementsSearchPlaceholder: 'Search...',
      selectedElementsListTitle: 'Selected elements',
      selectedElementsSearchPlaceholder: 'Search...'
   };

   configWithCheckAll: StTwoListSelectionConfig = {
      allElementsListTitle: 'All element',
      allElementsListSubtitle: '0 users',
      allElementsSearchPlaceholder: 'Search...',
      selectedElementsListTitle: 'Selected elements',
      selectedElementsListSubtitle: '0 users',
      selectedElementsSearchPlaceholder: 'Search...',
      orderPlaceholder: 'Order by alphabet'
   };

   public orderOptions: Array<StDropDownMenuItem> = [
      {
         label: 'A-Z',
         value: 1
      },
      {
         label: 'Z-A',
         value: 2
      }
   ];

   constructor() {
      this.fillLists();
   }

   onChange(event: Event): void {
      if (this.completeUserList.length === 0) {
         this.configWithCheckAll.allElementsListSubtitle = `0 users`;
      } else {
         this.configWithCheckAll.allElementsListSubtitle = `0/${this.completeUserList.length} users selected`;
      }

      if (this.selectedUserList.length === 0) {
         this.configWithCheckAll.selectedElementsListSubtitle = `0 users`;
      } else {
         this.configWithCheckAll.selectedElementsListSubtitle = `0/${this.selectedUserList.length} users selected`;
      }
   }

   onNumItemsAll(event: Event): void {
      this.configWithCheckAll.allElementsListSubtitle = `${event}/${this.completeUserList.length} users selected`;
   }

   onNumItemsSelected(event: Event): void {
      this.configWithCheckAll.selectedElementsListSubtitle = `${event}/${this.selectedUserList.length} users selected`;
   }

   showSelectedElements(): void {
      console.log(JSON.stringify(this.selectedUserList.map(item => item.name)));
   }

   selectExtraLabel(el: StTwoListSelectExtraLabelAction): void {
      el.event.stopImmediatePropagation();
      console.log('Selected label', el);
   }

   changeOrder(order: StDropDownMenuItem): void {
      console.log('change order, ', order);
   }

   private fillLists(): void {
      for (let i = 0; i < 300; i++) {

            this.completeUserList.push({ id: i, name: `User-${i}` });
            if (i % 4 === 0) {
               this.selectedUserList.push(_.clone(this.completeUserList[i]));
            }

      }

      this.itemAll = {id: this.completeUserList.length, name : 'All', itemAll: true};
   }
}
