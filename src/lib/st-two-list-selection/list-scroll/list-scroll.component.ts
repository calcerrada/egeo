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

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-scroll',
   templateUrl: './list-scroll.component.html',
   styleUrls: ['./list-scroll.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListScrollComponent {

   @Input() @StRequired() list: StTwoListSelectionElement[];
   @Input() editable: boolean = false;
   @Input() hasAllList?: boolean = false;
   @Input() itemAll?: StTwoListSelectionElement;
   @Input() @StRequired() qaTag: string;
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() search: EventEmitter<string> = new EventEmitter<string>();


   scrollItems: StTwoListSelectionElement[] = [];
   firstEl: number = 0;

   get listQaTag(): string {
      return this.qaTag + '-scroll-list';
   }

   get listCheckAllQaTag(): string {
      return this.qaTag + '-check-all-scroll-list';
   }

}
