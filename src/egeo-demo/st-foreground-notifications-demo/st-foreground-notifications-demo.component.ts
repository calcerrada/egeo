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
   selector: 'st-foreground-notifications-demo',
   templateUrl: './st-foreground-notifications-demo.component.html',
   styleUrls: ['./st-foreground-notifications-demo.component.scss']
})
export class StForegroundNotificationsDemoComponent {
   items: any[]= [
      {
         text : 'This is a neutral informational notification',
         status: '',
         visible: true
      },
      {
         text : 'This is a successful feedback notification',
         status: 'success',
         visible: true
      }, {
         text : 'This is a warning feedback notification',
         status: 'warning',
         visible: true
      }, {
         text : 'This is a critical error feedback notification',
         status: 'critical',
         visible: true
      }
    ];
  public toggleNotifications(index: number): void {
    this.items[index].visible = !this.items[index].visible;
  }
}
