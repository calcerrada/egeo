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
import { Component } from '@angular/core';

import { StIconsDemoService } from './st-icons-demo.service';
import { StIconDemoModel } from './st-icons-demo.model';

@Component({
  selector: 'st-icons-demo',
  templateUrl: './st-icons-demo.html',
  styleUrls: ['st-icons-demo.scss']
})

export class StIconsDemoComponent {

   public iconList: StIconDemoModel[] = [];

   constructor(private service: StIconsDemoService) {
      this.iconList = service.getIconList();
   }
}
