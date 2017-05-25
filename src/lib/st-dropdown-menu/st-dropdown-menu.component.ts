import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StDropDownMenuGroup, StDropDownMenuItem } from './st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu',
   templateUrl: './st-dropdown-menu.component.html',
   styleUrls: ['./st-dropdown-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownMenuComponent implements OnInit {

   @Input() active: boolean;
   @Input() items: StDropDownMenuItem[] | StDropDownMenuGroup[];
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   private itemsGroup: StDropDownMenuGroup[] = [];

   constructor() {
   }

   ngOnInit(): void {

      if (undefined === this.items) {
         throw new Error('Attribute items is required');
      }

      this.checkGroup();
   }

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkGroup();
      }
   }

   checkGroup(): void {
      if (this.isDropDownGroup(this.items)) {
         this.itemsGroup = this.items;
      }
   }

   isDropDownGroup(value: StDropDownMenuItem[] | StDropDownMenuGroup[]): value is StDropDownMenuGroup[] {
      return value && value.length > 0 && (<StDropDownMenuGroup>value[0]).title !== undefined;
   }

   onChange(value: StDropDownMenuItem): void {
      this.change.emit(value);
   }



}

