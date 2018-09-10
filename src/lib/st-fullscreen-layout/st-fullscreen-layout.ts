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
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StWindowRefService } from '../utils/window-service';


/**
 * @description {Component} [Fullscreen Layout]
 *
 * Component that show a fullscreen view with title and space for buttons and a
 * main content defined by user using ng-content
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-fullscreen-layout [title]="'Edition'">
 *    <div class="st-fullscreen-layout-buttons">
 *       <button class="button button-secondary-line button-separator" (click)="onClickHideButton()">Cancel</button>
 *       <button class="button button-primary" (click)="onClickHideButton()">Save</button>
 *    </div>
 *    <div class="st-fullscreen-layout-content">
 *       <h1>TEST</h1>
 *    </div>
 * </st-fullscreen-layout>
 * ```
 */
@Component({
   selector: 'st-fullscreen-layout',
   templateUrl: './st-fullscreen-layout.html',
   styleUrls: ['./st-fullscreen-layout.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFullscreenLayoutComponent implements OnDestroy {
   /** @Input {string} [title=""] Title of fullscreen layout */
   @Input() title: string = '';

   constructor( private windowRef: StWindowRefService) {
      this.windowRef.nativeWindow.document.body.style.overflow = 'hidden';
   }

   ngOnDestroy(): void {
      this.windowRef.nativeWindow.document.body.style.overflow = '';
}

}
