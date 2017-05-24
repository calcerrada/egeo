import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, Router } from '@angular/router';

import { StHeaderModel, StHeaderUserMenuModel, StSubMenuModel } from './st-header.model';

@Component({
   selector: 'st-header',
   templateUrl: './st-header.component.html',
   styleUrls: ['./st-header.component.scss']
})
export class StHeaderComponent implements OnInit {

   @Input() appName: string | undefined;
   @Input() companyName: string = 'Stratio';

   // TODO: In the future this header can use image or text for now, only use text
   appLogoPath: string | undefined;

   @Input() maxWidth: number;

   @Input() menu: StHeaderModel[] = [];

   @Input() userMenu: StHeaderUserMenuModel;
   @Input() qaTag: string;

   @Output() contentChangeOffset: EventEmitter<number> = new EventEmitter<number>();

   selectedSubmenu: StSubMenuModel[] = [];
   navigationOffset: number = 0;

   private headerOffset: number = 0;
   private showSubmenu: boolean = false;

   constructor(
      private _router: Router,
      private _cd: ChangeDetectorRef,
      private el: ElementRef
   ) { }

   public hasSubmenu(): boolean {
      let menu: StHeaderModel | undefined = this.menu.find((menuOption) => this._router.url.includes(menuOption.link));
      if (menu !== undefined && menu.subMenus !== undefined && menu.subMenus.length > 0) {
         this.selectedSubmenu = menu.subMenus;
         this.checkIfNotify(true);
         return true;
      } else {
         this.selectedSubmenu = [];
         this.checkIfNotify(false);
         return false;
      }
   }

   public ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a necesary field');
      }
      this.headerOffset = this.el.nativeElement.getBoundingClientRect().left;
      this.showSubmenu = this.hasSubmenu();
      this.notifyOffset();
   }

   public onPositionChange(newPosition: number): void {
      this.navigationOffset = newPosition - this.headerOffset;
      this._cd.markForCheck();
   }

   public hasUserMenu(): boolean {
      return this.userMenu !== undefined;
   }

   public getHeaderStyle(): Object {
      if (this.maxWidth !== undefined && typeof this.maxWidth === 'number' && this.maxWidth > 0) {
         return {
            'max-width': `${this.maxWidth}px`
         };
      } else {
         return {};
      }
   }

   private checkIfNotify(hasSubMenu: boolean): void {
      if (this.showSubmenu !== hasSubMenu) {
         this.showSubmenu = hasSubMenu;
         this.notifyOffset();
      }
   }

   private notifyOffset(): void {
      if (this.showSubmenu) {
            this.contentChangeOffset.emit(140);
         } else {
            this.contentChangeOffset.emit(95);
         }
   }
}
