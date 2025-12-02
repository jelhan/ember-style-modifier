import Modifier from 'ember-modifier';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

// Cannot be typed as `Partial<CSSStyleDeclaration>` because `CSSStyleDeclaration`
// interface does _not_ included dashed CSS property names. It only includes the
// camelCase version of a CSS property.
// https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1672

function isObject(o) {
  return typeof o === 'object' && Boolean(o);
}

/**
 * Returns a two-dimensional array, like:
 *
 * ```js
 * [
 *   ['font-size', '16px'],
 *   ['text-align', 'center'],
 *   ['color', 'red']
 * ]
 * ```
 *
 * This data structure is slightly faster to process than an object / dictionary.
 */
function compileStyles(positional, named) {
  return [...positional.filter(isObject), named].map(obj => Object.entries(obj).map(([k, v]) => [dasherize(k), v])).flat();
}
class StyleModifier extends Modifier {
  existingStyles = new Set();
  setStyles(element, newStyles) {
    const {
      existingStyles
    } = this;
    const rulesToRemove = new Set(existingStyles);

    // clear cache of existing styles
    existingStyles.clear();
    newStyles.forEach(([property, value]) => {
      assert(`Your given value for property '${property}' is ${value} (${typeOf(value)}). ` + 'Accepted types are string and undefined. Please change accordingly.', typeof value === 'undefined' || typeOf(value) === 'string');

      // priority must be specified as separate argument
      // value must not contain "!important"
      let priority = '';
      if (value && value.includes('!important')) {
        priority = 'important';
        value = value.replace('!important', '');
      }

      // update CSSOM
      element.style.setProperty(property, value, priority);

      // should not remove rules that have been updated in this cycle
      rulesToRemove.delete(property);

      // cache styles that have been set for potential clean-up when argument changes
      existingStyles.add(property);
    });

    // remove rules that were present in last cycle but aren't present in this one
    rulesToRemove.forEach(rule => element.style.removeProperty(rule));
  }
  modify(element, positional, named) {
    this.setStyles(element, compileStyles(positional, named));
  }
}

export { StyleModifier as default };
//# sourceMappingURL=style.js.map
