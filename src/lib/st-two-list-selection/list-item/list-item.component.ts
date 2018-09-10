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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-item',
   templateUrl: './list-item.component.html',
   styleUrls: ['./list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class ListItemComponent {

   @Input() @StRequired() item: StTwoListSelectionElement;
   @Input() @StRequired() qaTag: string;
   @Input() editable: boolean = false;
   @Input() mode: 'compact' | 'normal' = 'normal';
   @Input() disabled: boolean = false;

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();

   constructor() { }

   get itemName(): string {
      return this.item && this.item.name !== undefined && this.item.name !== null ? this.item.name : '';
   }

   get itemQaTag(): string {
      return this.qaTag + '-item-' + this.item.id;
   }

   get checkQaTag(): string {
      return this.qaTag + '-check-' + this.item.id;
   }

   get selected(): boolean {
      return this.item.selected ? true : false;
   }

   get itemMode(): string {
      let style: string = this.getModeStyle();
      style += this.selected ? ' sth-two-list-selection__selected_item' : '';
      return style;
   }

   getModeStyle(): string {
      return this.mode === 'normal' ? 'item-normal sth-two-list-selection__item-normal' :
         'item-compact sth-two-list-selection__item-compact';
   }

   emitOnSelect(event: Event): void {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.selectItem.emit(this.item);
   }
}
