import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { Order, ORDER_TYPE } from './shared/order';
import { StTableHeader } from './shared/table-header.interface';

@StEgeo()
@Component({
   selector: 'st-table',
   templateUrl: './st-table.component.html',
   styleUrls: ['./st-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableComponent {
   @Input() @StRequired() fields: StTableHeader[];
   @Input() @StRequired() qaTag: string;
   @Input() header: boolean = true;
   @Input() sortable: boolean = true;
   @Input() currentOrder: Order;
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter();

   public orderTypes: any = ORDER_TYPE;

   public onChangeOrder(field: StTableHeader): void {
      if (field) {
         if (this.currentOrder && this.currentOrder.orderBy === field.id) {
            this.changeOrderDirection();
         } else {
            this.currentOrder = new Order(field.id, ORDER_TYPE.ASC);
         }
         this.changeOrder.emit(this.currentOrder);
      }
   }

   public getHeaderItemClass(field: StTableHeader): string {
      let isOrderAsc = this.isSortedByFieldAndDirection(field, this.orderTypes.ASC);
      return isOrderAsc ? 'icon-arrow2_up' : 'icon-arrow2_down';
   }

   public isSortedByField(field: StTableHeader): boolean {
      return this.currentOrder && this.currentOrder.orderBy === field.id;
   }

   private isSortedByFieldAndDirection(field: StTableHeader, orderType: ORDER_TYPE): boolean {
      return this.isSortedByField(field) && this.currentOrder.type === orderType;
   }

   private changeOrderDirection(): void {
      let newDirection = this.currentOrder.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
      this.currentOrder = new Order(this.currentOrder.orderBy, newDirection);
   }
}
