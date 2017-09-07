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
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StHeaderMenuOption } from '@stratio/egeo';

import { HEADER_MENU } from './st-header-demo.model';

@Component({
   selector: 'st-header-demo',
   templateUrl: './st-header-demo.component.html',
   styles: [`
      .header-container {
         width: 100%;
         position: relative;
      }
      .content-after-header {
         padding-top: 90px;
      }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderDemoComponent {

   public height: string;
   public headerMenuSchema: StHeaderMenuOption[] = HEADER_MENU;

   constructor(private _cd: ChangeDetectorRef) {}
}
