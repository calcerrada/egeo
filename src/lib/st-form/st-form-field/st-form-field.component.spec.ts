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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { PipesModule } from '../../pipes/pipes.module';
import { JSON_SCHEMA } from '../spec/resources/json-schema';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
import { StFormFieldComponent } from './st-form-field.component';
import { StInputModule } from '../../st-input/st-input.module';
import { StSwitchModule } from '../../st-switch/st-switch.module';

let component: StFormFieldComponent;
let fixture: ComponentFixture<StFormFieldComponent>;
let formControl: FormControl = new FormControl();

describe('StFormFieldComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, StSwitchModule, PipesModule, StFormDirectiveModule],
         declarations: [StFormFieldComponent]
      })
         .compileComponents();  // compile template and css
   }));


   beforeEach(() => {
      fixture = TestBed.createComponent(StFormFieldComponent);
      component = fixture.componentInstance;
   });

   describe('should be able to render inputs with their validations', () => {

      describe('number input', () => {
         let input: HTMLInputElement;
         let numberInputProperty: any;
         let minValue: number;
         let maxValue: number;
         beforeEach(() => {
            numberInputProperty = JSON_SCHEMA.properties.genericNumberInput;
            minValue = numberInputProperty.minimum;
            maxValue = numberInputProperty.maximum;
            component.schema = {key: 'genericNumberInput', value: numberInputProperty};
            component.formControl = formControl;
         });

         it('if user tries to type text, input value is not updated', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');

            input.focus();
            input.value = 'fake test';
            input.blur();

            fixture.detectChanges();

            expect(input.value).toBe('');
         });

         it('required input', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            component.required = true;
            fixture.detectChanges();

            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');

            input.focus();
            input.value = '7';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('min number validation', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            input.focus();
            input.value = (minValue - 1).toString();
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + minValue);

            input.value = minValue.toString();
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('max number validation', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            input.value = (maxValue + 1).toString();
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + maxValue);

            input.value = maxValue.toString();
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         describe('number has to be between a certain range', () => {

            it('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
               numberInputProperty.exclusiveMinimum = true;
               fixture.detectChanges();


               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();
               // minor than the minimum
               input.value = (minValue - 1).toString();
               input.dispatchEvent(new Event('input'));
               input.blur();

               fixture.detectChanges();


               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));

               // equal to the minimum
               input.value = minValue.toString();
               input.dispatchEvent(new Event('input'));

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
            });

            it('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
               numberInputProperty.exclusiveMinimum = false;
               fixture.detectChanges();

               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();

               // minor than the minimum
               input.value = minValue.toString();
               input.dispatchEvent(new Event('input'));

               input.blur();

               fixture.detectChanges();


               expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
            });

            it('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
               numberInputProperty.exclusiveMaximum = true;
               fixture.detectChanges();

               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();
               // major than the maximum
               input.value = (maxValue + 1).toString();
               input.dispatchEvent(new Event('input'));
               input.blur();

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));

               // equal to the maximum
               input.value = maxValue.toString();
               input.dispatchEvent(new Event('input'));
               fixture.detectChanges();


               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
            });

            it('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
               numberInputProperty.exclusiveMaximum = false;
               fixture.detectChanges();
               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();

               // minor than the minimum
               input.value = maxValue.toString();
               input.dispatchEvent(new Event('input'));

               input.blur();

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('#genericNumberInput').parentNode.parentNode.querySelector('.st-input-error-layout span')).toBeNull();
            });
         });

         it('When form control is updated externally, it is updated', () => {
            formControl.setValue(5);

            fixture.detectChanges();

            input = fixture.nativeElement.querySelector('#genericNumberInput');

            expect(input.value).toBe('5');
         });
      });

      describe('text input', () => {
         let input: HTMLInputElement;
         let textInputProperty: any;
         let minLength: number;
         let maxLength: number;

         beforeEach(() => {
            textInputProperty = JSON_SCHEMA.properties.genericTextInput;
            minLength = textInputProperty.minLength;
            maxLength = textInputProperty.maxLength;
            component.schema = {key: 'genericTextInput', value: textInputProperty};
            formControl = new FormControl('');
            component.formControl = formControl;
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericTextInput');
         });
         it('required validation', () => {
            component.required = true;
            fixture.detectChanges();
            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');

            input.value = 'aa';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('min length validation', () => {
            input.focus();

            input.value = 'a'.repeat(minLength - 1);
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field min length is ' + minLength);

            input.value = 'a'.repeat(minLength);
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('max length validation', () => {
            input.focus();

            input.value = 'a'.repeat(maxLength + 1);
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field max length is ' + maxLength);

            input.focus();
            input.value = 'a'.repeat(maxLength);
            input.dispatchEvent(new Event('input'));

            input.blur();
            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('pattern validation', () => {
            input.focus();
            input.value = 'bbbb';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('Invalid value');

            input.focus();
            input.value = 'aa';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('When form control is updated externally, it is updated', () => {
            formControl.setValue('aa');

            fixture.detectChanges();

            input = fixture.nativeElement.querySelector('#genericTextInput');

            expect(input.value).toBe('aa');
         });
      });

   });

   describe('should be able to render switches with their validations', () => {
      let switchElement: HTMLInputElement;
      let booleanProperty: any;

      beforeEach(() => {
         booleanProperty = JSON_SCHEMA.properties.boolean;
         component.schema = {key: 'boolean', value: booleanProperty};
         formControl = new FormControl(true);
         component.formControl = formControl;
         fixture.detectChanges();

         switchElement = fixture.nativeElement.querySelector('#boolean-input');
      });

      it('label is displayed', () => {
         expect(fixture.nativeElement.querySelector('#boolean-text').textContent).toContain(booleanProperty.title);
      });

      it('tooltip is displayed if description exits', () => {
         let tooltip: HTMLElement = fixture.nativeElement.querySelector('#boolean-tooltip');
         let tooltipText: Element = (<Element> tooltip.parentNode).querySelector('.sth-tooltip-content-text');

         expect(tooltipText.innerHTML).toBe(booleanProperty.description);
      });

      it('icon for opening tooltip is not displayed if description does not exit', () => {
         fixture = TestBed.createComponent(StFormFieldComponent);
         component = fixture.componentInstance;

         component.schema = {key: 'boolean', value: {type: 'boolean', description: undefined}};
         component.formControl = formControl;
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('#boolean-label-contextual-help')).toBeNull();
      });

      it('if schema contains a default value, switch has to be initialized with it', () => {
         expect(switchElement.checked).toBe(booleanProperty.default);
      });

      it('if switch is disabled, when user clicks on it, it does not change', () => {
         formControl.disable();
         let previousValue: boolean = Boolean(fixture.nativeElement.querySelector('#boolean-input').checked);
         fixture.detectChanges();

         fixture.nativeElement.querySelector('#boolean-input').click();
         fixture.detectChanges();

         expect(Boolean(fixture.nativeElement.querySelector('#boolean-input').checked)).toBe(previousValue);
      });

      it('if switch is enabled, when user clicks on it, it has to change', () => {
         formControl.enable();
         fixture.detectChanges();

         let previousValue: boolean = Boolean(switchElement.checked);
         switchElement.click();

         expect(Boolean(switchElement.checked)).not.toBe(previousValue);
         expect(Boolean(switchElement.checked)).toBe(!previousValue);
      });
   });
});
