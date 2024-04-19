/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Require all exported classes an app might use.
 * @suppress {extraRequire}
 */

goog.require('shaka.Deprecate');
goog.require('shaka.Player');
goog.require('shaka.abr.SimpleAbrManager');
goog.require('shaka.ads.AdManager');
goog.require('shaka.cast.CastProxy');
goog.require('shaka.cast.CastReceiver');
goog.require('shaka.dash.DashParser');
goog.require('shaka.hls.HlsParser');
goog.require('shaka.mss.MssParser');
goog.require('shaka.log');
goog.require('shaka.media.AdaptationSetCriteria');
goog.require('shaka.media.InitSegmentReference');
goog.require('shaka.media.ManifestParser');
goog.require('shaka.media.PreferenceBasedCriteria');
goog.require('shaka.media.PresentationTimeline');
goog.require('shaka.media.SegmentIndex');
goog.require('shaka.media.SegmentReference');
goog.require('shaka.net.DataUriPlugin');
goog.require('shaka.net.HttpFetchPlugin');
goog.require('shaka.net.HttpXHRPlugin');
goog.require('shaka.offline.OfflineManifestParser');
goog.require('shaka.offline.OfflineScheme');
goog.require('shaka.offline.Storage');
goog.require('shaka.offline.indexeddb.StorageMechanism');
goog.require('shaka.polyfill.AbortController');
goog.require('shaka.polyfill.Aria');
goog.require('shaka.polyfill.EncryptionScheme');
goog.require('shaka.polyfill.Fullscreen');
goog.require('shaka.polyfill.MediaSource');
goog.require('shaka.polyfill.MediaCapabilities');
goog.require('shaka.polyfill.Orientation');
goog.require('shaka.polyfill.PatchedMediaKeysApple');
goog.require('shaka.polyfill.PatchedMediaKeysNop');
goog.require('shaka.polyfill.PatchedMediaKeysWebkit');
goog.require('shaka.polyfill.PiPWebkit');
goog.require('shaka.polyfill.RandomUUID');
goog.require('shaka.polyfill.Symbol');
goog.require('shaka.polyfill.VTTCue');
goog.require('shaka.polyfill.VideoPlayPromise');
goog.require('shaka.polyfill.VideoPlaybackQuality');
goog.require('shaka.polyfill');
goog.require('shaka.text.Cue');
goog.require('shaka.text.LrcTextParser');
goog.require('shaka.text.Mp4TtmlParser');
goog.require('shaka.text.Mp4VttParser');
goog.require('shaka.text.TextEngine');
goog.require('shaka.text.SbvTextParser');
goog.require('shaka.text.SrtTextParser');
goog.require('shaka.text.SsaTextParser');
goog.require('shaka.text.TtmlTextParser');
goog.require('shaka.text.VttTextParser');
goog.require('shaka.text.WebVttGenerator');
goog.require('shaka.cea.CeaDecoder');
goog.require('shaka.cea.Mp4CeaParser');
goog.require('shaka.cea.TsCeaParser');
goog.require('shaka.transmuxer.AacTransmuxer');
goog.require('shaka.transmuxer.Ac3');
goog.require('shaka.transmuxer.Ac3Transmuxer');
goog.require('shaka.transmuxer.ADTS');
goog.require('shaka.transmuxer.Ec3');
goog.require('shaka.transmuxer.Ec3Transmuxer');
goog.require('shaka.transmuxer.H264');
goog.require('shaka.transmuxer.H265');
goog.require('shaka.transmuxer.Mp3Transmuxer');
goog.require('shaka.transmuxer.MpegAudio');
goog.require('shaka.transmuxer.MpegTsTransmuxer');
goog.require('shaka.transmuxer.Opus');
goog.require('shaka.transmuxer.TransmuxerEngine');
goog.require('shaka.transmuxer.MssTransmuxer');
goog.require('shaka.transmuxer.TsTransmuxer');
goog.require('shaka.ui.Controls');
goog.require('shaka.ui.PlayButton');
goog.require('shaka.ui.SettingsMenu');
goog.require('shaka.ui.OverflowMenu');
goog.require('shaka.ui.AudioLanguageSelection');
goog.require('shaka.ui.AdCounter');
goog.require('shaka.ui.AdPosition');
goog.require('shaka.ui.AirPlayButton');
goog.require('shaka.ui.BigPlayButton');
goog.require('shaka.ui.CastButton');
goog.require('shaka.ui.ContextMenu');
goog.require('shaka.ui.Element');
goog.require('shaka.ui.FastForwardButton');
goog.require('shaka.ui.FullscreenButton');
goog.require('shaka.ui.Localization');
goog.require('shaka.ui.LoopButton');
goog.require('shaka.ui.Matrix4x4');
goog.require('shaka.ui.MatrixQuaternion');
goog.require('shaka.ui.MuteButton');
goog.require('shaka.ui.Overlay');
goog.require('shaka.ui.PipButton');
goog.require('shaka.ui.PlaybackRateSelection');
goog.require('shaka.ui.PresentationTimeTracker');
goog.require('shaka.ui.RecenterVRButton');
goog.require('shaka.ui.RemoteButton');
goog.require('shaka.ui.ResolutionSelection');
goog.require('shaka.ui.RewindButton');
goog.require('shaka.ui.SkipAdButton');
goog.require('shaka.ui.SmallPlayButton');
goog.require('shaka.ui.Spacer');
goog.require('shaka.ui.StatisticsButton');
goog.require('shaka.ui.TextSelection');
goog.require('shaka.ui.VolumeBar');
goog.require('shaka.ui.VRManager');
goog.require('shaka.ui.VRUtils');
goog.require('shaka.ui.VRWebgl');
goog.require('shaka.util.Dom');
goog.require('shaka.util.Error');
goog.require('shaka.util.FairPlayUtils');
goog.require('shaka.util.Iterables');
