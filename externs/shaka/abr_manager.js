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


/** @externs */



/**
 * An object which selects Streams from a set of possible choices.  This also
 * watches for system changes to automatically adapt for the current streaming
 * requirements.  For example, when the network slows down, this class is in
 * charge of telling the Player which streams to switch to in order to reduce
 * the required bandwidth.
 *
 * This class is given a set of streams to choose from when the Player starts
 * up.  This class should store these and use them to make future decisions
 * about ABR.  It is up to this class how those decisions are made.  All the
 * Player will do is tell this class what streams to choose from.
 *
 * @interface
 * @exportDoc
 */
shakaExtern.AbrManager = function() {};


/**
 * A callback from the Player that should be called when the AbrManager decides
 * it's time to change to a different set of streams.
 *
 * The first argument is a map of content types to chosen streams.
 *
 * The second argument is an optional boolean.  If true, all data will be
 * flushed from the buffer, which will result in a buffering event.
 *
 * @typedef {function(!Object.<string, !shakaExtern.Stream>, boolean=)}
 * @exportDoc
 */
shakaExtern.AbrManager.SwitchCallback;

/**
 * A getter from the Player that should provide actual playback statistics
 * when the ABR manager needs to take decisions based on these.
 *
 * The provider function should return {shakaExtern.Stats}.
 *
 * @typedef {function()}
 * @exportDoc
 */
shakaExtern.AbrManager.StatsProvider;


/**
 * A factory for creating the abr manager.  This will be called with 'new'.
 *
 * @typedef {function(new:shakaExtern.AbrManager)}
 * @exportDoc
 */
shakaExtern.AbrManager.Factory;


/**
 * Initializes the AbrManager.
 *
 * @param {shakaExtern.AbrManager.SwitchCallback} switchCallback
 * @param {shakaExtern.AbrManager.StatsProvider} statsProvider
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.init = function(switchCallback, statsProvider) {};


/**
 * Stops any background timers and frees any objects held by this instance.
 * This will only be called after a call to init.
 *
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.stop = function() {};


/**
 * Updates manager's variants collection.
 *
 * @param {!Array.<!shakaExtern.Variant>} variants
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.setVariants = function(variants) {};


/**
 * Updates manager's text streams collection.
 *
 * @param {!Array.<!shakaExtern.Stream>} streams
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.setTextStreams = function(streams) {};


/**
 * Chooses one Stream from each media type in mediaTypesToUpdate to switch to.
 * All Variants and Streams must be from the same Period.
 *
 * @param {!Array.<!string>} mediaTypesToUpdate
 * @return {!Object.<string, shakaExtern.Stream>}
 * @exportDoc
 */
// TODO: Consider breaking down into chooseVariant() and chooseText()
shakaExtern.AbrManager.prototype.chooseStreams =
    function(mediaTypesToUpdate) {};


/**
 * Enables automatic Stream choices from the last StreamSets passed to
 * chooseStreams(). After this, the AbrManager may call switchCallback() at any
 * time.
 *
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.enable = function() {};


/**
 * Disables automatic Stream suggestions. After this, the AbrManager may not
 * call switchCallback().
 *
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.disable = function() {};


/**
 * Notifies the AbrManager that a segment has been downloaded (includes MP4
 * SIDX data, WebM Cues data, initialization segments, and media segments).
 *
 * @param {number} deltaTimeMs The duration, in milliseconds, that the request
 *     took to complete.
 * @param {number} numBytes The total number of bytes transferred.
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.segmentDownloaded = function(
    deltaTimeMs, numBytes) {};


/**
 * Gets an estimate of the current bandwidth in bit/sec.  This is used by the
 * Player to generate stats.
 *
 * @return {number}
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.getBandwidthEstimate = function() {};


/**
 * Sets the abr configurations.
 *
 * @param {shakaExtern.AbrConfiguration} config
 * @exportDoc
 */
shakaExtern.AbrManager.prototype.configure = function(config) {};
