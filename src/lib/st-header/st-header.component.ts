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
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   Input,
   OnInit,
   Output,
   ViewChild,
   HostListener,
   AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';

import { StHeaderMenuOption, StHeaderSubMenuOption } from './st-header.model';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StWindowRefService } from '../utils/window-service';


/**
 * @description {Component} [Header]
 *
 * The header component is a main component of an application.
 * This component must be on top and scroll with page, when scroll is in a calculated position,
 * the header shrinks and fix to top.
 *
 * @model
 *
 *   [Header menu options] {./st-header.model.ts#StHeaderMenuOption}
 *   [Submenu options] {./st-header.model.ts#StHeaderSubMenuOption}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-header [menu]="headerMenuSchema" id="header">
 *     <div class="sth-header-logo">
 *        <!-- Logo as svg, image, etc. -->
 *     </div>
 *     <div class="sth-header-user-menu">
 *        <!-- Right header menu, with user menu, notifications, etc -->
 *     </div>
 *
 *  </st-header>
 * ```
 */
@Component({
   selector: 'st-header',
   templateUrl: './st-header.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderComponent implements AfterViewInit {

   /** @Input {StHeaderMenuOption[]} [menu] Array with menu option to show */
   @Input() menu: StHeaderMenuOption[] = [];
   /** @Output {string} [selectMenu] Notify any menu option selection */
   @Output() selectMenu: EventEmitter<string> = new EventEmitter<string>();

   @ViewChild('headerDivElement') headerDivElement: ElementRef;
   @ViewChild('headerFixPart') headerFixPart: ElementRef;
   @ViewChild('userMenuContainerElement') userMenuContainer: ElementRef;

   public showMenuNames: boolean = true;

   private _headerSize: number = 0;
   private _window: Window;

   constructor(
      private _cd: ChangeDetectorRef,
      private _router: Router,
      private _windowServiceRef: StWindowRefService,
      private _el: ElementRef) {
      this._window = _windowServiceRef.nativeWindow;
   }

   public ngAfterViewInit(): void {
      this._headerSize = this.headerFixPart.nativeElement.scrollWidth + this.userMenuContainer.nativeElement.scrollWidth + 20;
      this.checkMenuLabelVisibility();
   }

   @HostListener('window:resize', [])
   onResize(): void {
      this.checkMenuLabelVisibility();
   }

   public get id(): string {
      return this._el.nativeElement.id || 'st-header';
   }

   public onSelectMenu(link: string): void {
      this._router.navigate([link]);
      this.selectMenu.emit(link);
   }

   public get menuContainerId(): string {
      return `${this.id}-menu`;
   }

   private checkMenuLabelVisibility(): void {
      let windowSize: number = this._window.innerWidth;
      let canShowMenuNames = this._headerSize <= windowSize;

      if (this.showMenuNames !== canShowMenuNames) {
         this.showMenuNames = canShowMenuNames;
         this._cd.markForCheck();
      }
   }
}
