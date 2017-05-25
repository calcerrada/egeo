import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StTwoListSelectionConfig, StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from './st-two-list-selection.model';

@Component({
   selector: 'st-two-list-selection-view',
   templateUrl: './st-two-list-selection.view.component.html',
   styleUrls: ['./st-two-list-selection.view.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class StTwoListSelectionViewComponent {

   @Input() @StRequired() qaTag: string;
   @Input() @StRequired() selectedElements: StTwoListSelectionElement[];
   @Input() allElements: StTwoListSelectionElement[];
   @Input() config: StTwoListSelectionConfig;
   @Input() editable: boolean = false;
   @Input() moveAllToSelectedButton: boolean = false;
   @Input() moveAllToAllButton: boolean = false;
   @Input() hasSearch: boolean = true;
   @Input() orderSelectedOptions: StDropDownMenuItem[] = [];
   @Input() orderAllOptions: StDropDownMenuItem[] = [];
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectAllElement: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectSelectedElement: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() searchOverAll: EventEmitter<string> = new EventEmitter<string>();
   @Output() searchOverSelected: EventEmitter<string> = new EventEmitter<string>();
   @Output() moveAllToSelected: EventEmitter<Event> = new EventEmitter<Event>();
   @Output() moveToSelected: EventEmitter<Event> = new EventEmitter<Event>();
   @Output() moveAllToAll: EventEmitter<Event> = new EventEmitter<Event>();
   @Output() moveToAll: EventEmitter<Event> = new EventEmitter<Event>();
   @Output() selectExtraLabelSelected: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() selectExtraLabelAll: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() changeOrderAll: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();
   @Output() changeOrderSelected: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   get allTitle(): string {
      return this.config && this.config.allElementsListTitle || '';
   }

   get allPlaceholder(): string {
      return this.config && this.config.allElementsSearchPlaceholder || '';
   }

   get selectedTitle(): string {
      return this.config && this.config.selectedElementsListTitle || '';
   }

   get allQaTag(): string {
      return this.qaTag + '-all-elements';
   }

   get selectedPlaceholder(): string {
      return this.config && this.config.selectedElementsSearchPlaceholder || '';
   }

   get selectedQaTag(): string {
      return this.qaTag + '-selected-elements';
   }
}
