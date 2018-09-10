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
import { Component } from '@angular/core';

@Component({
   selector: 'st-bubble-demo',
   templateUrl: './st-bubble-demo.component.html',
   styleUrls: ['./st-bubble-demo.component.scss']
})
export class StBubbleDemoComponent {

   public text: string = 'What needed to deploy Crossdata?';
   public hidden: boolean = true;

   onClick(): void {
      this.hidden = !this.hidden;
   }
}
