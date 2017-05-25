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
   @Input() @StRequired() qaTag: string;
   @Input() label: string;
   @Input() labelPosition: 'top' | 'right' | 'left' = 'top';
   @Input() contextualHelp: string;
   @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

   public _stModel: boolean;
   public disabled: boolean;
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

   getLabelStatus(): StFormLabelStatus {
      if (this.disabled) {
         return StFormLabelStatus.DISABLED;
      }
   }

   // load external change
   writeValue(value: boolean): void {
      this.onChange(value);
      this._cd.markForCheck();
   }

   // internal change callback
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   setDisabledState(disable: boolean): void {
      this.disabled = disable;
      this._cd.markForCheck();
   }

   onChange(value: boolean): void {
      if (!this.disabled) {
         this._stModel = value;
         this.change.emit(this._stModel);
         if (this.registeredOnChange) {
            this.registeredOnChange(value);
         }
      }
   }
}
