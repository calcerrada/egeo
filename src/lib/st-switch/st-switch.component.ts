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
import {
   Component,
   Input,
   ChangeDetectionStrategy,
   forwardRef,
   ChangeDetectorRef, Output, EventEmitter, OnInit
} from '@angular/core';
import {
   FormControl,
   ControlValueAccessor,
   NG_VALUE_ACCESSOR
} from '@angular/forms';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StFormLabelStatus } from '../utils/egeo-form/st-form-label/st-form-label-status.enum';

@Component({
   selector: 'st-switch',
   templateUrl: './st-switch.html',
   styleUrls: ['./st-switch.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StSwitchComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StSwitchComponent implements ControlValueAccessor {
   @Input() qaTag: string;
   @Input() label: string;
   @Input() name: string;
   @Input() contextualHelp: string;
   @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

   private _stModel: boolean;
   private _disabled: boolean;
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {
   }

   @Input() @StRequired()
   get stModel(): boolean {
      return this._stModel;
   }

   set stModel(value: boolean) {
      this._stModel = value;
      this._cd.markForCheck();
   }

   @Input()
   get disabled(): boolean {
      return this._disabled;
   }

   set disabled(disabled: boolean) {
      this._disabled = disabled;
      this._cd.markForCheck();
   }

   get labelQaTag(): string {
      return (this.qaTag || this.name) + '-label';
   }

   get relatedInput(): string {
      return `${this.name}-input`;
   }

   // load external change
   writeValue(value: boolean): void {
      if (!this._disabled) {
         this._stModel = value;
         this.change.emit(this._stModel);
         if (this.registeredOnChange) {
            this.registeredOnChange(value);
         }
      }
   }


   // internal change callback
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   setDisabledState(disable: boolean): void {
      this.disabled = disable;
   }

   onChange(event: MouseEvent): void {
      event.stopPropagation();
      let value: boolean = (<HTMLInputElement>event.target).checked;
      this._stModel = value;
      this.writeValue(value);
   }
}
