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
export interface MenuOption {
   route: string;
   name: string;
}

export const OPTIONS: MenuOption[] = [
   { route: 'alerts-demo', name: 'Alerts' },
   { route: 'button-demo', name: 'Buttons' },
   { route: 'breadcrumbs', name: 'Breadcrumbs' },
   { route: 'checkbox-demo', name: 'Checkbox' },
   { route: 'dropdown-demo', name: 'Dropdown' },
   { route: 'dropdown-menu-demo', name: 'Dropdown Menu' },
   { route: 'form-demo', name: 'Form' },
   { route: 'header-demo', name: 'Header' },
   { route: 'help-demo', name: 'Help' },
   { route: 'info-box-demo', name: 'Info Box' },
   { route: 'input', name: 'Input' },
   { route: 'item-list-demo', name: 'Item List' },
   { route: 'label-demo', name: 'Label' },
   { route: 'main', name: 'Main' },
   { route: 'modal-demo', name: 'Modal' },
   { route: 'page-title-demo', name: 'Page Title' },
   { route: 'pagination-demo', name: 'Pagination' },
   { route: 'search-demo', name: 'Search' },
   { route: 'select-demo', name: 'Select' },
   { route: 'switch-demo', name: 'Switch' },
   { route: 'tip-demo', name: 'Tip' },
   { route: 'tooltip-demo', name: 'Tooltip' },
   { route: 'tree-demo', name: 'Tree' },
   { route: 'two-list-selection-demo', name: 'Two List Selection' }
];
