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
import { src, dest } from 'gulp';
import { join, basename } from 'path';

// These imports lack of type definitions.
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulpCleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const gulpSass = require('gulp-sass');
const gulpPostCss = require('gulp-postcss');
const gulpSassBundle = require('scss-bundle');

const postCssPlugins = [
   autoprefixer({ browsers: ['IE 11'] }),
   cssnano({ reduceIdents: false })
];

/** Create a gulp task that builds SCSS files. */
export function buildScssTask(outputDir: string, sourceDir: string, minifyOutput: boolean = false): any {
   return () => {
      return src(join(sourceDir, '**/*.scss'))
         .pipe(gulpSass().on('error', gulpSass.logError))
         .pipe(gulpPostCss(postCssPlugins))
         .pipe(gulpIf(minifyOutput, gulpCleanCss()))
         .pipe(dest(outputDir));
   };
}

/** Create a gulp task that builds SCSS files given a mainFile. */
export function buildScssFromFileTask(outputDir: string, sourceFile: string, minifyOutput: boolean = false): any {
   return () => {
      return src(sourceFile)
         .pipe(gulpSass().on('error', gulpSass.logError))
         .pipe(gulpPostCss(postCssPlugins))
         .pipe(gulpIf(minifyOutput, gulpCleanCss()))
         .pipe(dest(outputDir));
   };
}
