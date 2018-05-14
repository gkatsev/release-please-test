/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @externs
 * @suppress {duplicate} To prevent compiler errors with the namespace
 *   being declared both here and by goog.provide in the library.
 */

/** @namespace */
var shaka = {};

/** @namespace */
shaka.extern = {};



/**
 * @interface
 * @exportDoc
 */
shaka.extern.Error = function() {};


/**
 * @type {shaka.util.Error.Severity}
 */
shaka.extern.Error.prototype.severity;


/**
 * @const {shaka.util.Error.Category}
 */
shaka.extern.Error.prototype.category;


/**
 * @const {shaka.util.Error.Code}
 */
shaka.extern.Error.prototype.code;


/**
 * @const {!Array.<*>}
 */
shaka.extern.Error.prototype.data;


/**
 * @type {boolean}
 */
shaka.extern.Error.prototype.handled;

