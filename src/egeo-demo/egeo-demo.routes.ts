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
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export class EgeoDemoMenu {
   id: string;
   name: string;
   path: string;
   moduleLazyLoad: string;
}

export const EGEO_DEMO_MENU: EgeoDemoMenu[] = [
   { id: 'st-alerts', name: 'Alerts', path: 'alerts-demo', moduleLazyLoad: 'StAlertsDemoModule' },
   { id: 'st-breadcrumbs', name: 'Breadcrumbs', path: 'breadcrumbs', moduleLazyLoad: 'StBreadcrumbsDemoModule' },
   { id: 'st-bubble', name: 'Bubble', path: 'bubble-demo', moduleLazyLoad: 'StBubbleDemoModule' },
   { id: 'st-button', name: 'Button', path: 'button-demo', moduleLazyLoad: 'StButtonDemoModule' },
   { id: 'st-checkbox', name: 'Checkbox', path: 'checkbox-demo', moduleLazyLoad: 'StCheckboxDemoModule' },
   { id: 'st-draggable-card', name: 'Draggable card', path: 'draggable-card-demo', moduleLazyLoad: 'StDraggableCardDemoModule' },
   { id: 'st-dropdown-menu', name: 'Dropdown menu', path: 'dropdown-menu-demo', moduleLazyLoad: 'StDropdownMenuDemoModule' },
   { id: 'st-file-button', name: 'File button', path: 'file-button-demo', moduleLazyLoad: 'StFileButtonDemoModule' },
   { id: 'st-footer', name: 'Footer', path: 'footer-demo', moduleLazyLoad: 'StFoterDemoModule' },
   { id: 'st-foreground-notifications', name: 'Foreground-notifications',
      path: 'foreground-notifications-demo', moduleLazyLoad: '@StForegroundNotificationsModule' },
   { id: 'st-form', name: 'Form', path: 'form-demo', moduleLazyLoad: 'StFormDemoModule' },
   { id: 'st-form-list', name: 'Form List', path: 'form-list-demo', moduleLazyLoad: 'StFormListDemoModule' },
   { id: 'st-fullscreen-layout', name: 'Fullscreen Layout', path: 'fullscreen-layout-demo', moduleLazyLoad: 'StFullscreenLayoutDemoModule' },
   { id: 'st-header', name: 'Header', path: 'header-demo', moduleLazyLoad: 'StHeaderDemoModule' },
   { id: 'st-help', name: 'Help', path: 'help-demo', moduleLazyLoad: 'StHelpDemoModule' },
   { id: 'st-horizontal-tabs', name: 'Horizontal Tabs', path: 'horizontal-tabs-demo', moduleLazyLoad: 'StHorizontalTabsModule' },
   { id: 'st-info-box', name: 'Info Box', path: 'info-box-demo', moduleLazyLoad: 'StInfoBoxDemoModule' },
   { id: 'st-info-card', name: 'Info Card', path: 'info-card-demo', moduleLazyLoad: 'StInfoCardDemoModule' },
   { id: 'st-input', name: 'Input', path: 'input', moduleLazyLoad: 'StInputDemoModule' },
   { id: 'st-item-list', name: 'Item List', path: 'item-list-demo', moduleLazyLoad: 'StItemListDemoModule' },
   { id: 'st-label', name: 'Label', path: 'label-demo', moduleLazyLoad: 'StLabelDemoModule' },
   { id: 'st-launcher', name: 'Launcher', path: 'launcher-demo', moduleLazyLoad: 'StLauncherDemoModule' },
   { id: 'st-modal', name: 'Modal', path: 'modal-demo', moduleLazyLoad: 'StModalDemoModule' },
   { id: 'st-page-title', name: 'Page Title', path: 'page-title-demo', moduleLazyLoad: 'StPageTitleDemoModule' },
   { id: 'st-pagination', name: 'Pagination', path: 'pagination-demo', moduleLazyLoad: 'StPaginationDemoModule' },
   { id: 'st-pop-over', name: 'Pop Over', path: 'pop-over-demo', moduleLazyLoad: 'StPopOverDemoModule' },
   { id: 'st-progress-bar', name: 'Progress Bar', path: 'progress-bar-demo', moduleLazyLoad: 'StProgressBarDemoModule' },
   { id: 'st-radio-menu', name: 'Radio Menu', path: 'radio-menu-demo', moduleLazyLoad: 'StRadioMenuDemoModule' },
   { id: 'st-radio', name: 'Radio', path: 'radio-demo', moduleLazyLoad: 'StRadioDemoModule' },
   { id: 'st-search', name: 'Search', path: 'search-demo', moduleLazyLoad: 'StSearchDemoModule' },
   { id: 'st-select', name: 'Select', path: 'select-demo', moduleLazyLoad: 'StSelectDemoModule' },
   { id: 'st-sidebar', name: 'Sidebar', path: 'sidebar-demo', moduleLazyLoad: 'SidebarDemoModule' },
   { id: 'st-spinner', name: 'Spinner', path: 'spinner-demo', moduleLazyLoad: 'StSpinnerDemoModule' },
   { id: 'st-switch', name: 'Switch', path: 'switch-demo', moduleLazyLoad: 'StSwitchDemoModule' },
   { id: 'st-tab-box', name: 'Tab Box', path: 'tab-box-demo', moduleLazyLoad: 'StTabBoxDemoModule' },
   { id: 'st-table', name: 'Table', path: 'table-demo', moduleLazyLoad: 'StTableDemoModule' },
   { id: 'st-tag-input', name: 'Tag Input', path: 'tag-input-demo', moduleLazyLoad: 'StTagInputDemoModule' },
   { id: 'st-textarea', name: 'Textarea', path: 'textarea', moduleLazyLoad: 'StTextareaDemoModule' },
   { id: 'st-tip', name: 'Tip', path: 'tip-demo', moduleLazyLoad: 'StTipDemoModule' },
   { id: 'st-toggle-buttons', name: 'Toggle Buttons', path: 'toggle-buttons-demo', moduleLazyLoad: 'StToggleButtonsDemoModule' },
   { id: 'st-tooltip', name: 'Tooltip', path: 'tooltip-demo', moduleLazyLoad: 'StTooltipDemoModule' },
   { id: 'st-tree', name: 'Tree', path: 'tree-demo', moduleLazyLoad: 'StTreeDemoModule' },
   { id: 'st-two-list-selection', name: 'Two List Selection', path: 'two-list-selection-demo', moduleLazyLoad: 'StTwoListSelectionDemoModule' },
   { id: 'st-vertical-tabs', name: 'Vertical Tabs', path: 'vertical-tabs-demo', moduleLazyLoad: 'StVerticalTabsDemoModule' },
   { id: 'st-widget', name: 'Widget', path: 'widget-demo', moduleLazyLoad: 'StWidgetDemoModule' }
];

// tslint:disable:max-line-length
const routes: Routes = [
   { path: 'alerts-demo', loadChildren: './st-alert-demo/st-alerts-demo.module#StAlertsDemoModule' },
   { path: 'breadcrumbs', loadChildren: './st-breadcrumbs-demo/st-breadcrumbs-demo.module#StBreadcrumbsDemoModule' },
   { path: 'bubble-demo', loadChildren: './st-bubble-demo/st-bubble-demo.module#StBubbleDemoModule' },
   { path: 'button-demo', loadChildren: './st-button-demo/st-button-demo.module#StButtonDemoModule' },
   { path: 'checkbox-demo', loadChildren: './st-checkbox-demo/st-checkbox-demo.module#StCheckboxDemoModule' },
   { path: 'draggable-card-demo', loadChildren: './st-draggable-card-demo/st-draggable-card-demo.module#StDraggableCardDemoModule' },
   { path: 'dropdown-menu-demo', loadChildren: './st-dropdown-menu-demo/st-dropdown-menu-demo.module#StDropdownMenuDemoModule' },
   { path: 'file-button-demo', loadChildren: './st-file-button-demo/st-file-button-demo.module#StFileButtonDemoModule' },
   { path: 'footer-demo', loadChildren: './st-footer-demo/st-footer-demo.module#StFooterDemoModule' },
   { path: 'foreground-notifications-demo', loadChildren: './st-foreground-notifications-demo/st-foreground-notifications-demo.module#StForegroundNotificationsDemoModule' },
   { path: 'form-demo', loadChildren: './st-form-demo/st-form-demo.module#StFormDemoModule' },
   { path: 'form-list-demo', loadChildren: './st-form-list-demo/st-form-list-demo.module#StFormListDemoModule' },
   { path: 'fullscreen-layout-demo', loadChildren: './st-fullscreen-layout-demo/st-fullscreen-layout-demo.module#StFullscreenLayoutDemoModule' },
   { path: 'header-demo', loadChildren: './st-header-demo/st-header-demo.module#StHeaderDemoModule' },
   { path: 'help-demo', loadChildren: './st-help-demo/st-help-demo.module#StHelpDemoModule' },
   { path: 'horizontal-tabs-demo', loadChildren: './st-horizontal-tabs-demo/st-horizontal-tabs-demo.module#StHorizontalTabsDemoModule' },
   { path: 'info-box-demo', loadChildren: './st-info-box-demo/st-info-box-demo.module#StInfoBoxDemoModule' },
   { path: 'info-card-demo', loadChildren: './st-info-card-demo/st-info-card-demo.module#StInfoCardDemoModule' },
   { path: 'input', loadChildren: './st-input-demo/st-input-demo.module#StInputDemoModule' },
   { path: 'item-list-demo', loadChildren: './st-item-list-demo/st-item-list-demo.module#StItemListDemoModule' },
   { path: 'label-demo', loadChildren: './st-label-demo/st-label-demo.module#StLabelDemoModule' },
   { path: 'launcher-demo', loadChildren: './st-launcher-demo/st-launcher-demo.module#StLauncherDemoModule' },
   { path: 'modal-demo', loadChildren: './st-modal-demo/st-modal-demo.module#StModalDemoModule' },
   { path: 'page-title-demo', loadChildren: './st-page-title-demo/st-page-title-demo.module#StPageTitleDemoModule' },
   { path: 'pagination-demo', loadChildren: './st-pagination-demo/st-pagination-demo.module#StPaginationDemoModule' },
   { path: 'pop-over-demo', loadChildren: './st-pop-over-demo/st-pop-over-demo.module#StPopOverDemoModule' },
   { path: 'progress-bar-demo', loadChildren: './st-progress-bar-demo/st-progress-bar-demo.module#StProgressBarDemoModule' },
   { path: 'radio-demo', loadChildren: './st-radio-demo/st-radio-demo.module#StRadioDemoModule' },
   { path: 'radio-menu-demo', loadChildren: './st-radio-menu-demo/st-radio-menu-demo.module#StRadioMenuDemoModule' },
   { path: 'search-demo', loadChildren: './st-search-demo/st-search-demo.module#StSearchDemoModule' },
   { path: 'select-demo', loadChildren: './st-select-demo/select-demo.module#StSelectDemoModule' },
   { path: 'sidebar-demo', loadChildren: './st-sidebar-demo/st-sidebar-demo.module#StSidebarDemoModule' },
   { path: 'spinner-demo', loadChildren: './st-spinner-demo/st-spinner-demo.module#StSpinnerDemoModule' },
   { path: 'switch-demo', loadChildren: './st-switch-demo/st-switch-demo.module#StSwitchDemoModule' },
   { path: 'tab-box-demo', loadChildren: './st-tab-box-demo/st-tab-box-demo.module#StTabBoxDemoModule' },
   { path: 'table-demo', loadChildren: './st-table-demo/st-table-demo.module#StTableDemoModule' },
   { path: 'tag-input-demo', loadChildren: './st-tag-input-demo/st-tag-input-demo.module#StTagInputDemoModule' },
   { path: 'textarea', loadChildren: './st-textarea-demo/st-textarea-demo.module#StTextareaDemoModule' },
   { path: 'tip-demo', loadChildren: './st-tip-demo/st-tip-demo.module#StTipDemoModule' },
   { path: 'toggle-buttons-demo', loadChildren: './st-toggle-buttons-demo/st-toggle-buttons-demo.module#StToggleButtonsDemoModule' },
   { path: 'tooltip-demo', loadChildren: './st-tooltip-demo/st-tooltip-demo.module#StTooltipDemoModule' },
   { path: 'tree-demo', loadChildren: './st-tree-demo/st-tree-demo.module#StTreeDemoModule' },
   { path: 'two-list-selection-demo', loadChildren: './st-two-list-selection-demo/st-two-list-selection-demo.module#StTwoListSelectionDemoModule' },
   { path: 'vertical-tabs-demo', loadChildren: './st-vertical-tabs-demo/st-vertical-tabs-demo.module#StVerticalTabsDemoModule' },
   { path: 'widget-demo', loadChildren: './st-widget-demo/st-widget-demo.module#StWidgetDemoModule' }
];
// tslint:enable


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
