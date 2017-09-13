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

import { Component, Input, ElementRef } from '@angular/core';
import { StEgeo, StRequired } from './../decorators/require-decorators';

/**
 * @description {Component} [Widget]
 *
 * Widget component is a container box for any type of widgets
 *
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-widget title="widget demo"></st-widget>
 * ```
 *
 */

@Component({
   selector: 'st-widget',
   templateUrl: 'st-widget.component.html',
   styleUrls: ['st-widget.component.scss']
})

export class StWidgetComponent {
   /** @Input {string} [title] title will be displayed in the widget header */
   @Input() title: string;

   public widgetId: string;

   constructor(private el: ElementRef) {
      this.widgetId = this.el.nativeElement.id ? this.el.nativeElement.id + '-widget' : undefined;
   }
}
