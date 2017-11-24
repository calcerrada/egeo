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
 * <st-widget title="widget demo" [loading]="isLoading" overwriteLoadingData="Loading..."></st-widget>
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
   /** @Input {bolean} [loading] when true, loading stauts is displayed    */
   @Input() loading: boolean = false;
   /** @Input {string} [title] text "loading data" will be overwritten with this parameter */
   @Input() overwriteLoadingData: string = 'Loading data';

   public widgetId: string;

   private _draggable: boolean = false;
   private _dragging: boolean = false;

   constructor(private el: ElementRef) {
      this.widgetId = this.el.nativeElement.id ? this.el.nativeElement.id + '-widget' : undefined;

   }

   public get dragging(): boolean {
      return this._dragging;
   }

   public set dragging(value: boolean) {
      this._dragging = value;
   }

   public get draggable(): boolean {
      return this._draggable;
   }

   public set draggable(value: boolean) {
      this.dragging = value;
      this._draggable = value;
   }
}
