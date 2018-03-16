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
import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { cloneDeep as _cloneDeep } from 'lodash';
import { StFormComponent } from '../st-form.component';
import { JSON_SCHEMA } from './resources/json-schema';
import { PipesModule } from '../../pipes/pipes.module';
import { StInputModule } from '../../st-input/st-input.module';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
import { StFormModule } from '../st-form.module';
import { StTooltipModule } from '../../st-tooltip/st-tooltip.module';
import { StCheckboxModule } from '../../st-checkbox/st-checkbox.module';
import { StFormFieldModule } from '../st-form-field/st-form-field.module';
import { CommonModule } from '@angular/common';
import { StCheckboxComponent } from '../../st-checkbox/st-checkbox.component';

let component: StFormComponent;
let fixture: ComponentFixture<StFormComponent>;

describe('StFormComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, StCheckboxModule, StFormFieldModule, StTooltipModule, PipesModule, StFormDirectiveModule],
         declarations: [StFormComponent]
      })
      // remove this block when the issue #12313 of Angular is fixed
         .overrideComponent(StCheckboxComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .overrideComponent(StFormComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      spyOn(window, 'setTimeout').and.callFake((func) => {
         func();
      });
      fixture = TestBed.createComponent(StFormComponent);
      component = fixture.componentInstance;
      component.schema = _cloneDeep(JSON_SCHEMA);
      fixture.detectChanges();
   });

   describe('should render a form according its json schema', () => {
      it('a control is created for each property with its ids', () => {
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.hasOwnProperty(propertyId)) {
               expect(fixture.nativeElement.querySelector('#' + propertyId)).not.toBeNull();
            }
         }
      });

      it('tooltips are generated using their descriptions', () => {
         fixture.whenStable().then(() => {
            fixture.detectChanges();
            for (let propertyId in JSON_SCHEMA.properties) {
               if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
                  let property: any = JSON_SCHEMA.properties[propertyId];
                  if (property.type !== 'object') {
                     let label: HTMLElement = fixture.nativeElement.querySelector('#' + propertyId + '-label');
                     if (property.description) {
                        expect(label.title).toBe(property.description);
                     } else {
                        expect(label.title).toBe('');
                     }
                  } else {
                     // properties of a section
                     for (let sectionPropertyId in property.properties) {
                        if (property.properties.hasOwnProperty(sectionPropertyId)) {
                           let sectionProperty: any = property.properties[sectionPropertyId];
                           let label: HTMLElement = fixture.nativeElement.querySelector('#' + sectionPropertyId + '-label');

                           if (sectionProperty.description) {
                              expect(label.title).toBe(sectionProperty.description);
                           } else {
                              expect(label.title).toBe('');
                           }

                        }
                     }
                  }
               }
            }
         });
      });

      it('controls are displayed with their default value and label', () => {
         let element: any;
         fixture.whenStable().then(() => {

            for (let propertyId in JSON_SCHEMA.properties) {
               if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
                  let property: any = JSON_SCHEMA.properties[propertyId];

                  if (property.enum) { // select field
                     fixture.detectChanges();
                     element = fixture.nativeElement.querySelector('#' + propertyId + '-input');
                  } else {
                     element = fixture.nativeElement.querySelector('#' + propertyId);
                  }

                  if (property.default) {
                     expect(element.value).toBe(property.default.toString());
                  }
                  expect(fixture.nativeElement.innerHTML).toContain(property.title);
               }
            }
         });
      });
   });

   describe('It has to be able to render nested properties', () => {
      let nestedProperty: any;
      beforeEach(() => {
         nestedProperty = JSON_SCHEMA.properties.executor;
      });

      it('A title has to be displayed for nested property', () => {
         expect(fixture.nativeElement.querySelector('h1.section-title').innerHTML).toContain(nestedProperty.title);
      });

      it('properties of the nested property are rendered', () => {
         let element: any;
         fixture.whenStable().then(() => {

            for (let propertyId in nestedProperty.properties) {
               if (nestedProperty.properties.hasOwnProperty(propertyId)) {
                  let property: any = nestedProperty.properties[propertyId];

                  if (property.enum) { // select field
                     fixture.detectChanges();
                     element = fixture.nativeElement.querySelector('#' + propertyId + '-input');
                  } else {
                     element = fixture.nativeElement.querySelector('#' + propertyId);
                  }

                  if (property.default) {
                     expect(element.value).toBe(property.default.toString());
                  }
                  expect(fixture.nativeElement.innerHTML).toContain(property.title);
               }
            }
         });
      });
   });

   describe('If there are some dependant fields', () => {
      beforeEach(() => {
         component.schema = {
            'properties': {
               'security': {
                  'title': 'Enable security',
                  'description': 'Enable or disable the security',
                  'type': 'boolean'
               },
               'dns': {
                  'title': 'DNS',
                  'description': 'DNS',
                  'type': 'string'
               }
            },
            'dependencies': {
               'security': ['dns']
            }
         };
         fixture.changeDetectorRef.detectChanges();
      });

      it('if a field has type boolean and has dependant fields, it will be displayed as a switch', () => {
         expect(fixture.nativeElement.querySelector('#security.st-switch')).not.toBeNull();
      });
   });


describe('Should be able to improve the visualization of its sections according to the ui attribute', () => {
   describe('section can be hidden if it has defined as show-more component', () => {
      beforeEach(() => {
         component.schema = {
            'title': 'Section name',
            'type': 'object',
            'ui': {
               'component': 'show-more'
            },
            'properties': {
               'name': {
                  'title': 'Name',
                  'type': 'string'
               },
               'age': {
                  'title': 'Age',
                  'type': 'integer'
               },
               'subsection': {
                  'title': 'Subsection',
                  'type': 'object',
                  'properties': {
                     'subName': {
                        'title': 'Subname',
                        'type': 'string'
                     },
                     'subAge': {
                        'title': 'Subage',
                        'type': 'integer'
                     }
                  }
               }
            }
         };

         component.parentName = undefined;
         fixture.detectChanges();
      });

      describe('link button should display a label ', () => {
         let fakeParentName = 'fake parent name';
         let fakeSectionName = 'Personal information';

         beforeEach(() => {
            component.schema = _cloneDeep(component.schema);
            component.parentName = fakeParentName;
            component.schema.title = fakeSectionName;
            fixture.detectChanges();
         });

         it ('with the title of the parent section if it is introduced', () => {
            let button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

            expect(button.innerHTML).toContain('Additional options of ' + fakeParentName);
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_right');

            button.click();
            fixture.detectChanges();

            expect(button.innerHTML).toContain('Additional options of ' + fakeParentName);
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_down');
         });

         it ('with the section name if parent name is not introduced', () => {
            component.parentName = undefined;
            component.schema.title = fakeSectionName;
            fixture.detectChanges();

            let button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

            expect(button.innerHTML).toContain('Additional options of ' + fakeSectionName);
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_right');

            button.click();
            fixture.detectChanges();

            expect(button.innerHTML).toContain('Additional options of ' + fakeSectionName);
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_down');
         });

         it ('without any section name if parent section and section name are not introduced', () => {
            component.parentName = undefined;
            component.schema.title = undefined;
            fixture.detectChanges();

            let button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

            expect(button.innerHTML).toContain('Additional options');
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_right');

            button.click();
            fixture.detectChanges();

            expect(button.innerHTML).toContain('Additional options');
            expect(button.querySelector('span i').classList).toContain('icon-arrow2_down');
         });
      });

      it('link button is displayed and all its properties are hidden', () => {
         expect(fixture.nativeElement.querySelector('button.button-link-primary')).not.toBeNull();
         expect(fixture.nativeElement.querySelector('#name').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#age').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#subsection-section').hidden).toBeTruthy();
      });

      it('fields will be hidden until user clicks on link button', () => {
         expect(fixture.nativeElement.querySelector('#name').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#age').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#subsection-section').hidden).toBeTruthy();

         fixture.nativeElement.querySelector('button').click();
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('#name').parentElement.parentElement.classList).not.toContain('hidden');
         expect(fixture.nativeElement.querySelector('#age').parentElement.parentElement.classList).not.toContain('hidden');
         expect(fixture.nativeElement.querySelector('#subsection-section').hidden).toBeFalsy();
      });

      it('When user clicks on the button, it changes its text to hide again these fields', () => {
         fixture.nativeElement.querySelector('button').click();
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('button').innerHTML).toContain('Additional options of ' + component.schema.title);

         fixture.nativeElement.querySelector('button').click();
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('#name').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#age').parentElement.parentElement.classList).toContain('hidden'); // form field element
         expect(fixture.nativeElement.querySelector('#subsection-section').hidden).toBeTruthy();
      });
   });
});


});


@Component({
   template: `
      <form novalidate>
         <st-form [schema]="schema" [(ngModel)]="model" name="generated" #formModel="ngModel">
         </st-form>
      </form>
      `
})
class FormInTemplateDrivenFormComponent {
   public schema: any = _cloneDeep(JSON_SCHEMA);
   public model: any = {};
   @ViewChild('formModel') public formModel: NgForm;

   constructor() {
      this.schema.properties.security = {
         'title': 'Enable security',
         'description': 'Enable or disable the security',
         'type': 'boolean'
      };
      this.schema.properties.dns = {
         'title': 'DNS',
         'description': 'DNS',
         'type': 'string'
      };

      this.schema.dependencies = {
         'security': ['dns']
      };
   }
}


describe('StFormComponent in templateDriven form', () => {
   let templateDrivenFixture: ComponentFixture<FormInTemplateDrivenFormComponent>;
   let templateDrivenComp: FormInTemplateDrivenFormComponent;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, CommonModule, ReactiveFormsModule, StFormModule, StFormFieldModule, StInputModule, StCheckboxModule],
         declarations: [FormInTemplateDrivenFormComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      templateDrivenFixture = TestBed.createComponent(FormInTemplateDrivenFormComponent);
      templateDrivenComp = templateDrivenFixture.componentInstance;
   });

   it('form can be disabled from outside', () => {
      templateDrivenFixture.detectChanges();
      templateDrivenFixture.whenStable().then(() => {
         templateDrivenComp.formModel.control.disable();
         templateDrivenFixture.detectChanges();
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
               expect(templateDrivenFixture.nativeElement.querySelector('#' + propertyId).disabled).toBeTruthy();
            }
         }
      });
   });

   it('form can be enabled after being disabled from outside', () => {
      templateDrivenFixture.detectChanges();
      templateDrivenFixture.whenStable().then(() => {
         templateDrivenComp.formModel.control.disable();
         templateDrivenFixture.detectChanges();
         templateDrivenComp.formModel.control.enable();
         templateDrivenFixture.detectChanges();
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
               expect(templateDrivenFixture.nativeElement.querySelector('#' + propertyId).disabled).toBeFalsy();
            }
         }
      });
   });

   it('fields which have a parent field wont be sent when parent is undefined', (done) => {
      templateDrivenFixture.detectChanges();

      templateDrivenFixture.whenStable().then(() => {

         expect(templateDrivenFixture.nativeElement.querySelector('#security-input')).not.toBeNull();
         expect(templateDrivenFixture.nativeElement.querySelector('input[name="dns"]')).toBeNull();

         expect(templateDrivenComp.model.dns).toBeUndefined();

         templateDrivenFixture.detectChanges();
         templateDrivenFixture.nativeElement.querySelector('#security-input').click();
         templateDrivenFixture.detectChanges();

         expect(templateDrivenComp.model.dns).toEqual(templateDrivenComp.schema.properties.dns.default);


         templateDrivenFixture.nativeElement.querySelector('#security-input').click();
         templateDrivenFixture.detectChanges();

         expect(templateDrivenComp.model.dns).toBeUndefined();
         done();
      });
   });
});
