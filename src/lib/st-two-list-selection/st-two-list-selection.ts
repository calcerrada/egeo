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
import { ChangeDetectorRef, EventEmitter, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

import { StTwoListSelectionElement } from './st-two-list-selection.model';

export type List = StTwoListSelectionElement[];
export type IdList = Array<string | number>;

export class StTwoListSelection {

   // Original Lists
   public originalAll: List;
   public originalSelected: List;

   // Work Lists
   public copyAllElement: List = [];
   public copySelectedElements: List = [];

   public allSearch: string = '';
   public hasCheckboxAllList?: boolean = false;
   public hasCheckboxSelectedList?: boolean = false;
   public itemAll?: StTwoListSelectionElement;
   public numItemsSelectedAll: EventEmitter<number> = new EventEmitter<number>();
   public numItemsSelectedSelected: EventEmitter<number> = new EventEmitter<number>();
   public selectedSearch: string = '';

   public searchBy: string = 'name';

   private emitter: EventEmitter<List>;
   private sortLists: 'id' | 'name';

   constructor(private _cd: ChangeDetectorRef) { }

   // Check selected element
   onSelectAllElement(selection: StTwoListSelectionElement): void {
      if (this.hasCheckboxAllList && selection.itemAll) {
         this.copyAllElement = _.cloneDeep(this.changeSelectedItemList(this.copyAllElement, !selection.selected));
         selection.selected = !selection.selected;
      } else {
         if (this.canSelect(selection, this.copyAllElement)) {
            selection.selected = !selection.selected;
         }
      }
      if (this.copyAllElement) {
         this.numItemsSelectedAll.emit(this.getNumItemsSelected(this.copyAllElement));
      }
   }

   // Check selected element
   onSelectSelectedElement(selection: StTwoListSelectionElement): void {
      if (this.hasCheckboxSelectedList && selection.itemAll) {
         this.copySelectedElements = _.cloneDeep(this.changeSelectedItemList(this.copySelectedElements, !selection.selected));
         selection.selected = !selection.selected;
      } else {
         if (this.canSelect(selection, this.copySelectedElements)) {
            selection.selected = !selection.selected;
         }
      }
      if (this.copySelectedElements) {
         this.numItemsSelectedSelected.emit(this.getNumItemsSelected(this.copySelectedElements));
      }
   }

   // Update search filter
   onSearchOverAll(search: { text: string }): void {
      this.allSearch = search.text;
   }

   // Update search filter
   onSearchOverSelected(search: { text: string }): void {
      this.selectedSearch = search.text;
   }

   // Move from all to selected
   onMoveToSelected(event: Event): void {
      let ids: IdList = this.getIdsToMove(this.copyAllElement);
      let result: List = this.moveIdsFromAllToSelected(this.originalAll, this.originalSelected, ids);
      this.emitter.emit(result);
      if (this.itemAll) this.itemAll.selected = false;
   }

   // Remove from selected
   onMoveToAll(event: Event): void {
      let ids: IdList = this.getIdsToMove(this.copySelectedElements);
      let result: List = this.removeIdsFromSelected(this.originalSelected, ids);
      this.emitter.emit(result);
      if (this.itemAll) this.itemAll.selected = false;
   }

   // Move all to selected
   onMoveAllToSelected(event: Event): void {
      this.emitter.emit(_.cloneDeep(this.originalAll));
   }

   // Remove All from selected
   onMoveAllToAll(event: Event): void {
      this.emitter.emit([]);
   }

   init(all: List, selected: List, changeEmitter: EventEmitter<List>, sorted: 'id' | 'name',
      hasCheckboxAllList: boolean = false, hasCheckboxSelectedList: boolean = false, itemAll: StTwoListSelectionElement= <any> null): void {
      this.emitter = changeEmitter;
      this.sortLists = sorted;
      this.originalAll = all;
      this.originalSelected = selected;
      this.generateWorkLists();
      this.hasCheckboxAllList = hasCheckboxAllList;
      this.hasCheckboxSelectedList = hasCheckboxSelectedList;
      this.itemAll = itemAll;
   }

   checkChanges(changes: SimpleChanges, allList: string, selectedList: string): void {
      if (changes[allList] !== undefined) {
         this.originalAll = changes[allList].currentValue;
      }
      if (changes[selectedList] !== undefined) {
         this.originalSelected = changes[selectedList].currentValue;
      }
      if (changes[allList] !== undefined || changes[selectedList] !== undefined) {
         this.generateWorkLists();
      }
   }

   private changeSelectedItemList(list: StTwoListSelectionElement[], selected: boolean): StTwoListSelectionElement[] {
      return _.cloneDeep(list).map((elem) => {
         elem.selected = selected;
         return elem;
      });
   }

   private getNumItemsSelected(list: List): number {
      const reducer = (accumulator: number, currentValue: StTwoListSelectionElement) => {
         return (currentValue.selected) ? accumulator + 1 : accumulator + 0;
      };
      return list.reduce(reducer, 0);
   }

   private generateWorkLists(): void {
      this.copyAllElement = this.copyLists(this.originalAll, this.copyAllElement, this.originalSelected);
      this.copySelectedElements = this.copyLists(this.originalSelected, this.copySelectedElements);
      if (this.sortLists !== undefined && (this.sortLists === 'id' || this.sortLists === 'name')) {
         this.copyAllElement = this.orderListBy(this.copyAllElement, this.sortLists);
         this.copySelectedElements = this.orderListBy(this.copySelectedElements, this.sortLists);
      }
   }

   private copyLists(newValue: List, prevState: List, without?: List): List {
      let list: List = _.cloneDeep(newValue);
      if (without && without.length > 0) {
         list = _.differenceBy(list, without, 'id');
      }

      let selected: IdList = this.getIdsToMove(prevState);
      this.searchAndSelect(list, selected);
      return list;
   }

   private searchAndSelect(list: List, selected: IdList): void {
      let i = 0;
      let actualIndex = -1;
      while (selected.length > 0 && i < list.length) {
         actualIndex = selected.indexOf(list[i].id);
         if (actualIndex > -1) {
            list[i].selected = true;
            selected.splice(actualIndex, 1);
            actualIndex = -1;
         }
         i++;
      }
   }

   private getIdsToMove(list: List): IdList {
      return list.reduce((prev, curr) => {
         if (curr.selected) {
            curr.selected = false;
            prev.push(curr.id);
         }
         return prev;
      }, []);
   }

   private moveIdsFromAllToSelected(all: List, selected: List, ids: IdList): List {
      let items: List = all.filter((item) => _.includes(ids, item.id));
      return _.xorBy(selected, _.cloneDeep(items), 'id');
   }

   private removeIdsFromSelected(selected: List, ids: IdList): List {
      return selected.reduce((prev, curr) => {
         if (!_.includes(ids, curr.id)) {
            prev.push(_.clone(curr));
         }
         return prev;
      }, []);
   }

   private orderListBy(list: List, by: string): List {
      return _.sortBy(list, by);
   }

   private canSelect(selection: StTwoListSelectionElement, list: List): boolean {
      return selection && list !== undefined && list.length > 0;
   }
}
