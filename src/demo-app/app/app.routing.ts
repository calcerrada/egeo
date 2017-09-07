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

import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main';

export const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         // Main redirection
         { path: '', redirectTo: 'main', pathMatch: 'full' },
         { path: 'alerts-demo', loadChildren: '@stratio/egeo-demo#StAlertsDemoModule' },
         { path: 'breadcrumbs', loadChildren: '@stratio/egeo-demo#StBreadcrumbsDemoModule' },
         { path: 'button-demo', loadChildren: '@stratio/egeo-demo#StButtonDemoModule' },
         { path: 'checkbox-demo', loadChildren: '@stratio/egeo-demo#StCheckboxDemoModule' },
         { path: 'dropdown-demo', loadChildren: '@stratio/egeo-demo#StDropdownDemoModule' },
         { path: 'dropdown-menu-demo', loadChildren: '@stratio/egeo-demo#StDropdownMenuDemoModule' },
         { path: 'form-demo', loadChildren: '@stratio/egeo-demo#StFormDemoModule' },
         { path: 'header-demo', loadChildren: '@stratio/egeo-demo#StHeaderDemoModule' },
         { path: 'help-demo', loadChildren: '@stratio/egeo-demo#StHelpDemoModule' },
         { path: 'info-box-demo', loadChildren: '@stratio/egeo-demo#StInfoBoxDemoModule' },
         { path: 'input', loadChildren: '@stratio/egeo-demo#StInputDemoModule' },
         { path: 'item-list-demo', loadChildren: '@stratio/egeo-demo#StItemListDemoModule' },
         { path: 'label-demo', loadChildren: '@stratio/egeo-demo#StLabelDemoModule' },
         { path: 'main', component: MainComponent },
         { path: 'modal-demo', loadChildren: '@stratio/egeo-demo#StModalDemoModule' },
         { path: 'pagination-demo', loadChildren: '@stratio/egeo-demo#StPaginationDemoModule' },
         { path: 'page-title-demo', loadChildren: '@stratio/egeo-demo#StPageTitleDemoModule' },
         { path: 'search-demo', loadChildren: '@stratio/egeo-demo#StSearchDemoModule' },
         { path: 'select-demo', loadChildren: '@stratio/egeo-demo#StSelectDemoModule' },
         { path: 'switch-demo', loadChildren: '@stratio/egeo-demo#StSwitchDemoModule' },
         { path: 'textarea', loadChildren: '@stratio/egeo-demo#StTextareaDemoModule' },
         { path: 'tip-demo', loadChildren: '@stratio/egeo-demo#StTipDemoModule' },
         { path: 'tooltip-demo', loadChildren: '@stratio/egeo-demo#StTooltipDemoModule' },
         { path: 'tree-demo', loadChildren: '@stratio/egeo-demo#StTreeDemoModule' },
         { path: 'two-list-selection-demo', loadChildren: '@stratio/egeo-demo#StTwoListSelectionDemoModule' }
      ]
   }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
