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
export class StHeaderMenuOption {
   icon: string; // Icon to show on left of menu label
   label: string; // Menu label to show
   link: string; // Link to navigate when click
   subMenus: StHeaderSubMenuOption[]; // List of submenu options
}

export class StHeaderSubMenuOption {
   label: string; // Label to show
   link: string; // Link to navigate when click
}
