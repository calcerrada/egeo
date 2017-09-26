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
import { Injectable } from '@angular/core';

import { StIconDemoModel } from './st-icons-demo.model';
import icons from 'raw-loader!./icons.txt';

@Injectable()
export class StIconsDemoService {

   constructor() { }

   getIconList(): StIconDemoModel[] {
      const result: StIconDemoModel[] = [];
      let execResult: RegExpExecArray;
      const regex = /.icon-(.*?)\:before([\t\s])*?\{.*?content:.*?\"(.*?)".*?}/gm;

      do {
         execResult = regex.exec(icons);
         if (execResult) {
            result.push({
               name: execResult[1] || '',
               key: execResult[3] || ''
            });
         }
      } while (execResult);
      return result.sort(this.strComparator);
   }

   private strComparator(item1: StIconDemoModel, item2: StIconDemoModel): number {
      return item1.name.localeCompare(item2.name);
   }
}
