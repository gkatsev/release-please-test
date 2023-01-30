/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('shaka.text.Utils');

goog.require('shaka.text.Cue');


shaka.text.Utils = class {
  /**
   * Flatten nested cue payloads recursively.  If a cue has nested cues,
   * their contents should be combined and replace the payload of the parent.
   *
   * @param {!shaka.text.Cue} cue
   * @return {string}
   * @private
   */
  static flattenPayload_(cue) {
    // Handle styles (currently bold/italics/underline).
    // TODO: add support for color rendering.
    const openStyleTags = [];
    const bold = cue.fontWeight >= shaka.text.Cue.fontWeight.BOLD;
    const italics = cue.fontStyle == shaka.text.Cue.fontStyle.ITALIC;
    const underline = cue.textDecoration.includes(
        shaka.text.Cue.textDecoration.UNDERLINE);
    if (bold) {
      openStyleTags.push('b');
    }
    if (italics) {
      openStyleTags.push('i');
    }
    if (underline) {
      openStyleTags.push('u');
    }

    // Prefix opens tags, suffix closes tags in reverse order of opening.
    const prefixStyleTags = openStyleTags.reduce((acc, tag) => {
      return `${acc}<${tag}>`;
    }, '');
    const suffixStyleTags = openStyleTags.reduceRight((acc, tag) => {
      return `${acc}</${tag}>`;
    }, '');

    if (cue.lineBreak) {
      // This is a vertical lineBreak, so insert a newline.
      return '\n';
    } else if (cue.nestedCues.length) {
      return cue.nestedCues.map(shaka.text.Utils.flattenPayload_).join('');
    } else {
      // This is a real cue.
      return prefixStyleTags + cue.payload + suffixStyleTags;
    }
  }

  /**
   * We don't want to modify the array or objects passed in, since we don't
   * technically own them.  So we build a new array and replace certain items
   * in it if they need to be flattened.
   * We also don't want to flatten the text payloads starting at a container
   * element; otherwise, for containers encapsulating multiple caption lines,
   * the lines would merge into a single cue. This is undesirable when a
   * subset of the captions are outside of the append time window. To fix
   * this, we only call flattenPayload() starting at elements marked as
   * isContainer = false.
   *
   * @param {!Array.<!shaka.text.Cue>} cues
   * @param {!Array.<!shaka.text.Cue>} result
   * @return {!Array.<!shaka.text.Cue>}
   */
  static getCuesToFlatten(cues, result) {
    for (const cue of cues) {
      if (cue.isContainer) {
        // Recurse to find the actual text payload cues.
        shaka.text.Utils.getCuesToFlatten(cue.nestedCues, result);
      } else {
        // Flatten the payload.
        const flatCue = cue.clone();
        flatCue.nestedCues = [];
        flatCue.payload = shaka.text.Utils.flattenPayload_(cue);
        result.push(flatCue);
      }
    }
    return result;
  }
};
