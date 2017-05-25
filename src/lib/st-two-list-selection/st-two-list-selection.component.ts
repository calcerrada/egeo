import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnInit,
   Output,
   SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StTwoListSelection } from './st-two-list-selection';
import { StTwoListSelectionConfig, StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from './st-two-list-selection.model';

@Component({
   selector: 'st-two-list-selection',
   template: `
      <st-two-list-selection-view
         [allElements]="allList | stFilterList:searchBy:allSearch"
         [selectedElements]="selectedList | stFilterList:searchBy:selectedSearch"
         [config]="config"
         [editable]="editable"
         [qaTag]="qaTag"
         [hasSearch]="hasSearch"
         [orderAllOptions]="orderAllOptions"
         [orderSelectedOptions]="orderSelectedOptions"
         [mode]="mode"

         [moveAllToSelectedButton]="moveAllToSelectedButton"
         [moveAllToAllButton]="moveAllToAllButton"

         (selectAllElement)="onSelectAllElement($event)"
         (selectSelectedElement)="onSelectSelectedElement($event)"
         (searchOverAll)="onSearchOverAll($event)"
         (searchOverSelected)="onSearchOverSelected($event)"
         (moveToSelected)="onMoveToSelected($event)"
         (moveToAll)="onMoveToAll($event)"
         (moveAllToSelected)="onMoveAllToSelected($event)"
         (moveAllToAll)="onMoveAllToAll($event)"
         (selectExtraLabelAll)="selectExtraLabelAll.emit($event)"
         (selectExtraLabelSelected)="selectExtraLabelAll.emit($event)"
         (changeOrderAll)="changeOrderAll.emit($event)"
         (changeOrderSelected)="changeOrderSelected.emit($event)"
      ></st-two-list-selection-view>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class StTwoListSelectionComponent extends StTwoListSelection implements OnInit, OnChanges {

   @Input() @StRequired('editable') allElements: StTwoListSelectionElement[];
   @Input() @StRequired() selectedElements: StTwoListSelectionElement[];
   @Output() selectedElementsChange: EventEmitter<StTwoListSelectionElement[]> = new EventEmitter<StTwoListSelectionElement[]>();

   @Output() selectExtraLabelAll: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() selectExtraLabelSelected: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() changeOrderAll: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();
   @Output() changeOrderSelected: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   @Input() config: StTwoListSelectionConfig;
   @Input() editable: boolean = false;
   @Input() @StRequired() qaTag: string;
   @Input() sortBy: 'id' | 'name' = 'id';
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Input() moveAllToSelectedButton: boolean = true;
   @Input() moveAllToAllButton: boolean = true;
   @Input() hasSearch: boolean = true;
   @Input() orderSelectedOptions: StDropDownMenuItem[] = [];
   @Input() orderAllOptions: StDropDownMenuItem[] = [];

   constructor(private cd: ChangeDetectorRef) {
      super(cd);
   }

   ngOnInit(): void {
      this.init(
         this.allElements,
         this.selectedElements,
         this.selectedElementsChange,
         this.sortBy
      );
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.checkChanges(changes, 'allElements', 'selectedElements');
   }

   get allList(): StTwoListSelectionElement[] {
      return this.copyAllElement;
   }

   get selectedList(): StTwoListSelectionElement[] {
      return this.copySelectedElements;
   }
}
