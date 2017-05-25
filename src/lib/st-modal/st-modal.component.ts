import {
   ChangeDetectionStrategy,
   Component,
   ComponentFactoryResolver,
   ComponentRef,
   EventEmitter,
   Input,
   OnDestroy,
   OnInit,
   Output,
   ViewChild,
   ViewContainerRef
} from '@angular/core';
import * as _ from 'lodash';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StModalButton, StModalConfig, StModalMainTextSize, StModalResponse, StModalType, StModalWidth } from './st-modal.interface';

@StEgeo()
@Component({
   selector: 'st-modal',
   templateUrl: './st-modal.component.html',
   styleUrls: ['./st-modal.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StModal implements OnDestroy, OnInit {
   @Input() @StRequired() modalConfig: StModalConfig;

   @Output() close: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
   @Output() click: EventEmitter<StModalResponse> = new EventEmitter<StModalResponse>();

   @Input() component: any;
   @ViewChild('stModalBody', { read: ViewContainerRef }) target: ViewContainerRef;

   private componentRef: ComponentRef<any>;

   constructor(private cfr: ComponentFactoryResolver) { }

   getModalSize(): Object {
      switch (this.modalConfig.modalWidth) {
         case StModalWidth.COMPACT:
            return {
               'min-width': '700px',
               'max-width': '700px',
               'max-heigth': '500px'
            };
         case StModalWidth.REGULAR:
            return {
               'min-width': '950px',
               'max-width': '950px',
               'max-heigth': '500px'
            };
         case StModalWidth.LARGE:
            return {
               'min-width': '1240px',
               'max-width': '1240px',
               'min-heigth': '600px',
               'max-heigth': '600px'
            };
         default:
            return {
               'min-width': '700px',
               'max-width': '700px',
               'max-heigth': '500px'
            };
      }
   }

   getTitleClass(): string {
      switch (this.modalConfig.modalType) {
         case StModalType.NEUTRAL: return 'st-modal-neutral';
         case StModalType.INFO: return 'st-modal-info';
         case StModalType.WARNING: return 'st-modal-warning';
         default: return 'st-modal-neutral';
      }
   }

   hasContextualTitle(): boolean {
      return this.modalConfig.contextualTitle !== undefined && this.modalConfig.contextualTitle.length > 0;
   }

   get contextualTitle(): string {
      return this.modalConfig.contextualTitle;
   }

   getHeaderHeight(): string {
      return this.hasContextualTitle() ? '90px' : '80px';
   }

   hasIcon(): boolean {
      return this.modalConfig.modalType !== StModalType.NEUTRAL;
   }

   getIcon(): string {
      if (this.modalConfig.modalType === StModalType.INFO) {
         return 'icon-info1';
      } else if (this.modalConfig.modalType === StModalType.WARNING) {
         return 'icon-alert';
      }
      return '';
   }

   getTitle(): string {
      return this.modalConfig.modalTitle;
   }

   hasButtons(): boolean {
      return this.modalConfig.buttons && this.modalConfig.buttons.length > 0;
   }

   getButtonIcon(left: boolean, button: StModalButton): string {
      if (button && button.icon) {
         if (button.iconLeft && left) {
            return button.icon;
         } else if (!button.iconLeft && !left) {
            return button.icon;
         }
      }
      return '';
   }

   getButtonSubtype(button: StModalButton): string {
      return button && button.primary ? 'subtype1' : 'subtype2';
   }

   getButtons(): StModalButton[] {
      return _.cloneDeep(this.modalConfig.buttons || []).reverse();
   }

   isMessageModal(): boolean {
      return this.modalConfig.message && this.modalConfig.message.length > 0;
   }

   isComplexMessageModal(): boolean {
      return this.modalConfig.html && this.modalConfig.html.length > 0;
   }

   getHTML(): string {
      return this.modalConfig.html;
   }

   get message(): string {
      return this.modalConfig.message;
   }

   get mainTextSize(): string {
      switch (this.modalConfig.mainText) {
         case StModalMainTextSize.BIG: return 'sth-modal-message-big';
         case StModalMainTextSize.MEDIUM: return 'sth-modal-message-medium';
         default: return '';
      }
   }

   get qaTag(): string {
      if (this.modalConfig && this.modalConfig.qaTag) {
         return this.modalConfig.qaTag;
      } else {
         throw new Error('[ERROR]: StModal => qa tag is a required field');
      }
   }

   /** INTERACTION WITH MODAL */

   clickButton(index: number, button: StModalButton): void {
      this.click.emit(button.response);
   }

   closeModal(event: MouseEvent): void {
      this.close.emit(event);
   }

   /** DYNAMIC MODAL BODY COMPONENT LOAD */

   ngOnInit(): void {
      if (this.component && !(this.modalConfig.html || this.modalConfig.message)) {
         this.loadBody();
      }
   }

   ngOnDestroy(): void {
      if (this.componentRef) {
         this.componentRef.destroy();
      }
   }

   private loadBody(): void {
      if (!this.componentRef) {
         this.target.clear();
         let compFactory = this.cfr.resolveComponentFactory(this.component);
         this.componentRef = this.target.createComponent(compFactory);
         this.bindModalInputs();
      }
   }

   private bindModalInputs(): void {
      for (let key in this.modalConfig.inputs) {
         if (this.modalConfig.inputs.hasOwnProperty(key)) {
            this.componentRef.instance[key] = (<any>this.modalConfig.inputs)[key];
         }
      }

      for (let key in this.modalConfig.outputs) {
         if (this.modalConfig.outputs.hasOwnProperty(key)) {
            this.componentRef.instance[key].subscribe((<any>this.modalConfig.outputs)[key]);
         }
      }
      this.componentRef.changeDetectorRef.detectChanges();
   }
}
