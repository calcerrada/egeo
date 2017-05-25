import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-selection',
   templateUrl: './list-selection.component.html',
   styleUrls: ['./list-selection.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSelectionComponent {

   @Input() @StRequired() list: StTwoListSelectionElement[];
   @Input() editable: boolean = false;
   @Input() @StRequired() title: string;
   @Input() @StRequired() searchPlaceholder: string;
   @Input() @StRequired() qaTag: string;
   @Input() important: boolean = false;
   @Input() hasSearch: boolean = true;
   @Input() orderOptions: StDropDownMenuItem[] = [];
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() search: EventEmitter<string> = new EventEmitter<string>();
   @Output() changeOrder: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   scrollItems: StTwoListSelectionElement[] = [];
   firstEl: number = 0;

   get searchQaTag(): string {
      return this.qaTag + '-search';
   }

   get listQaTag(): string {
      return this.qaTag + '-list';
   }

   get hasOrder(): boolean {
      return this.orderOptions && this.orderOptions.length > 0;
   }

   get heightMode(): number {
      return this.mode === 'normal' ? 35 : 27;
   }
}
