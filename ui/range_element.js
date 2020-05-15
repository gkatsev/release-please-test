/** @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


goog.provide('shaka.ui.RangeElement');

goog.require('shaka.ui.Element');
goog.require('shaka.util.Dom');


/**
 * A range element, built to work across browsers.
 *
 * In particular, getting styles to work right on IE requires a specific
 * structure.
 *
 * This also handles the case where the range element is being manipulated and
 * updated at the same time.  This can happen when seeking during playback or
 * when casting.
 *
 * @extends {shaka.ui.Element}
 * @export
 */
shaka.ui.RangeElement = class extends shaka.ui.Element {
  /**
   * @param {!HTMLElement} parent
   * @param {!shaka.ui.Controls} controls
   * @param {!Array.<string>} containerClassNames
   * @param {!Array.<string>} barClassNames
   */
  constructor(parent, controls, containerClassNames, barClassNames) {
    super(parent, controls);

    /**
     * This container is to support IE 11.  See detailed notes in
     * less/range_elements.less for a complete explanation.
     * @protected {!HTMLElement}
     */
    this.container = shaka.util.Dom.createHTMLElement('div');
    this.container.classList.add('shaka-range-container');
    this.container.classList.add(...containerClassNames);

    /** @private {boolean} */
    this.isChanging_ = false;

    /** @protected {!HTMLInputElement} */
    this.bar =
      /** @type {!HTMLInputElement} */ (document.createElement('input'));

    this.bar.classList.add('shaka-range-element');
    this.bar.classList.add(...barClassNames);
    this.bar.type = 'range';
    // TODO(#2027): step=any causes keyboard nav problems on IE 11.
    this.bar.step = 'any';
    this.bar.min = '0';
    this.bar.max = '1';
    this.bar.value = '0';

    this.container.appendChild(this.bar);
    this.parent.appendChild(this.container);

    this.eventManager.listen(this.bar, 'mousedown', () => {
      this.isChanging_ = true;
      this.onChangeStart();
    });

    this.eventManager.listen(this.bar, 'touchstart', (e) => {
      this.isChanging_ = true;
      this.setBarValueForTouch_(e);
      this.onChangeStart();
    });

    this.eventManager.listen(this.bar, 'input', () => {
      this.onChange();
    });

    this.eventManager.listen(this.bar, 'touchmove', (e) => {
      this.setBarValueForTouch_(e);
      this.onChange();
    });

    this.eventManager.listen(this.bar, 'touchend', (e) => {
      this.isChanging_ = false;
      this.setBarValueForTouch_(e);
      this.onChangeEnd();
    });

    this.eventManager.listen(this.bar, 'mouseup', () => {
      this.isChanging_ = false;
      this.onChangeEnd();
    });
  }

  /**
   * @param {number} min
   * @param {number} max
   */
  setRange(min, max) {
    this.bar.min = min;
    this.bar.max = max;
  }

  /**
   * Called when user interaction begins.
   * To be overridden by subclasses.
   */
  onChangeStart() {}

  /**
   * Called when a new value is set by user interaction.
   * To be overridden by subclasses.
   */
  onChange() {}

  /**
   * Called when user interaction ends.
   * To be overridden by subclasses.
   */
  onChangeEnd() {}

  /** @return {number} */
  getValue() {
    return parseFloat(this.bar.value);
  }

  /** @param {number} value */
  setValue(value) {
    // The user interaction overrides any external values being pushed in.
    if (this.isChanging_) {
      return;
    }

    this.bar.value = value;
  }

  /**
   * Synchronize the touch position with the range value.
   * Comes in handy on iOS, where users have to grab the handle in order
   * to start seeking.
   * @param {Event} event
   * @private
   */
  setBarValueForTouch_(event) {
    event.preventDefault();

    const changedTouch = /** @type {TouchEvent} */ (event).changedTouches[0];
    const rect = this.bar.getBoundingClientRect();
    const min = parseFloat(this.bar.min);
    const max = parseFloat(this.bar.max);

    // Calculate the range value based on the touch position.

    // Pixels from the left of the range element
    const touchPosition = changedTouch.clientX - rect.left;

    // Pixels per unit value of the range element.
    const scale = (max - min) / rect.width;

    // Touch position in units, which may be outside the allowed range.
    let value = min + scale * touchPosition;

    // Keep value within bounds.
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    this.bar.value = value;
  }
};
