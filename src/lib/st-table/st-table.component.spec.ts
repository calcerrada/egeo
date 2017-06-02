import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Order, ORDER_TYPE } from './shared/order';
import { StTableComponent } from './st-table.component';
import { StTableHeader } from './shared/table-header.interface';

let fixture: ComponentFixture<StTableComponent>;
let component: StTableComponent;
let fakeFields: StTableHeader[] = [{ id: 'id', label: 'ID', sortable: true }, { id: 'name', label: 'Name', sortable: false },
{ id: 'lastName', label: 'Last name' }, { id: 'phone', label: 'Phone', sortable: true }];

describe('StTableComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StTableComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTableComponent);
      component = fixture.componentInstance;
      component.fields = fakeFields;
      component.qaTag = 'fake qa tag';

   });

   describe('If developer does not specify some inputs, they will be set by default', () => {
      beforeEach(() => {
         fixture.detectChanges();
      });
      it('header is shown by default', () => {
         expect(component.header).toBeTruthy();
      });

      it('table is sortable by default', () => {
         expect(component.sortable).toBeTruthy();
      });
   });


   it('if table is sortable but there are fields not sortable, arrow is only displayed for sortable fields', () => {
      component.sortable = true;
      fixture.detectChanges();
      let headerItems: HTMLTableHeaderCellElement[] = fixture.nativeElement.querySelectorAll('.sth-table__header-item');


      expect(headerItems[0].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');
      expect(headerItems[1].querySelector('.sth-table__order-arrow')).toBeNull();
      expect(headerItems[2].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');
      expect(headerItems[3].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');

   });

   it('if table is not sortable but there are fields sortable, arrow is displayed for sortable fields', () => {
      component.sortable = false;
      fixture.detectChanges();
      let headerItems: HTMLTableHeaderCellElement[] = fixture.nativeElement.querySelectorAll('.sth-table__header-item');

      expect(headerItems[0].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');
      expect(headerItems[1].querySelector('.sth-table__order-arrow')).toBeNull();
      expect(headerItems[2].querySelector('.sth-table__order-arrow')).toBeNull();
      expect(headerItems[3].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');

   });

   it('If fields input is not introduced, it throws an error', () => {
      component.fields = undefined;
      try {
         fixture.detectChanges();
         expect(component.fields).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-table-component: field fields is a required field');
      }
   });

   it('If qa tag input is not introduced, it throws an error', () => {
      component.qaTag = undefined;
      try {
         fixture.detectChanges();
         expect(component.qaTag).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-table-component: field qaTag is a required field');
      }
   });

   describe('Should return the class name for header items according to the current order and direction', () => {
      beforeEach(() => {
         fixture.detectChanges();
      });

      it('if current order is not defined yet, the sortable fields will be displayed with a down arrow', () => {
         component.currentOrder = undefined;
         fixture.detectChanges();
         let headerItems: HTMLTableHeaderCellElement[] = fixture.nativeElement.querySelectorAll('.sth-table__header-item');

         expect(headerItems[0].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');
         expect(headerItems[headerItems.length - 1].querySelector('.sth-table__order-arrow').classList).toContain('icon-arrow2_down');
      });

      it('if table is sort by the field but not in ascending direction, it returns icon-arrow2_down', () => {
         component.currentOrder = new Order(fakeFields[0].id, ORDER_TYPE.DESC);

         expect(component.getHeaderItemClass(fakeFields[0])).toBe('icon-arrow2_down');
      });

      it('if table is sort in ascending direction but not by the introduced field, it returns icon-arrow2_down', () => {
         component.currentOrder = new Order(fakeFields[1].id, ORDER_TYPE.ASC);

         expect(component.getHeaderItemClass(fakeFields[0])).toBe('icon-arrow2_down');
      });

      it('if table is sort by that field and in ascending direction, it returns icon-arrow2_up', () => {
         component.currentOrder = new Order(fakeFields[0].id, ORDER_TYPE.ASC);

         expect(component.getHeaderItemClass(fakeFields[0])).toBe('icon-arrow2_up');
      });

   });

   describe('When user clicks on a field in the table header, order is changed', () => {
      beforeEach(() => {
         spyOn(component.changeOrder, 'emit');
         fixture.detectChanges();
      });
      it('if field is different to the current order`s one, current order is changed to the selected field and in direction ASC', () => {
         component.currentOrder = new Order(fakeFields[0].id, ORDER_TYPE.ASC);

         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.sth-table__header-item')[fakeFields.length - 1];
         headerItem.click();
         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[fakeFields.length - 1].id);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.ASC);
         // also order arrow is updated

         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(Array.from(headerItem.querySelector('.sth-table__order-arrow').classList)[1]).toBe('icon-arrow2_up');
         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);
      });

      it('if field is the same to the current order`s one, only order direction is changed', () => {
         // ascent sorting
         component.currentOrder = new Order(fakeFields[0].id, ORDER_TYPE.ASC);
         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.sth-table__header-item')[0];
         headerItem.click();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[0].id);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.DESC);
         // also order arrow is updated
         expect(Array.from(headerItem.querySelector('.sth-table__order-arrow').classList)[1]).toBe('icon-arrow2_down');

         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);

         // descent sorting
         component.currentOrder = new Order(fakeFields[0].id, ORDER_TYPE.DESC);
         headerItem.click();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[0].id);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.ASC);
         // also order arrow is updated
         expect(Array.from(headerItem.querySelector('.sth-table__order-arrow').classList)[1]).toBe('icon-arrow2_up');

         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);
      });

      it('if field is undefined, order is not changed', () => {
         component.currentOrder = new Order(fakeFields[1].id, ORDER_TYPE.DESC);

         component.onChangeOrder(undefined);
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[1].id);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.DESC);
         expect(component.changeOrder.emit).not.toHaveBeenCalled();
      });

      it('should stand up the field`s header which table is sorted by', () => {
         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.sth-table__header-item')[fakeFields.length - 1];
         headerItem.click();
         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(headerItem.classList).toContain('sth-table__header-item--selected');
      });

   });

})
   ;
