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
   Component,
   Input,
   OnDestroy,
   Renderer,
   ChangeDetectorRef,
   ElementRef,
   Output,
   EventEmitter
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventWindowManager } from '../../utils/event-window-manager';
import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StHeaderMenuOption } from '../st-header.model';

@Component({
   selector: 'st-header-menu-option',
   templateUrl: './menu-option.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderMenuOptionComponent extends EventWindowManager implements OnDestroy {

   @Input() option: StHeaderMenuOption;
   @Input() showMenuName: boolean;

   @Output() selectMenu: EventEmitter<string> = new EventEmitter<string>();

   private subscription: Subscription;
   private actualPath: string = '';

   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef,
      private router: Router
   ) {
      super(renderer, cd, elementRef);
      this.subscription = this.router.events.subscribe((event) => this.onRouterEvent(event));
      this.actualPath = this.router.url;
   }

   public get qaId(): string {
      let id: string = `${this.elementRef.nativeElement.id}-${this.option.label.toLowerCase()}`;
      id.replace(/\s+/ig, '_');
      return id;
   }

   public get hasSubmenu(): boolean {
      return this.option.subMenus && this.option.subMenus.length > 0;
   }

   public get submenuList(): StDropDownMenuItem[] {
      return this.hasSubmenu ? this.option.subMenus.map(_ => ({
         label: _.label,
         value: _.link,
         selected: this.actualPath === _.link
      })) : [];
   }

   public ngOnDestroy(): void {
      this.closeElement();
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }

   public changeStatus(event: Event): void {
      this.openElement();
   }

   public changeOption(selected: StDropDownMenuItem): void {
      this.closeElement();
      this.selectMenu.emit(selected.value);
   }

   private onRouterEvent(event: any): void {
      if (event instanceof NavigationEnd) {
         this.actualPath = event.urlAfterRedirects;
      }
   }
}
