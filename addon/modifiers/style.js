import Modifier from 'ember-modifier';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

function isObject(o) {
  return typeof o === 'object' && Boolean(o);
}

export default class StyleModifier extends Modifier {
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
  get styles() {
    const { positional, named } = this.args;
    // This is a workaround for the missing `Array#flat` in IE11.
    return [].concat(
      ...[...positional.filter(isObject), named].map(obj =>
        Object.entries(obj).map(([k, v]) => [dasherize(k), v])
      )
    );
  }

  setStyles(newStyles) {
    const oldStyles = this._oldStyles || [];
    this._oldStyles = newStyles;
    const rulesToRemove = oldStyles ? new Set(oldStyles.map(e => e[0])) : null;

    newStyles.forEach(([property, value]) => {
      assert(
        `Your given value for property '${property}' is ${value} (${typeOf(value)}). ` +
        'Accepted types are string and undefined. Please change accordingly.',
        typeof value === 'undefined' || typeOf(value) === 'string'
      );

      // priority must be specified as separate argument
      // value must not contain "!important"
      let priority = '';
      if (value && value.includes('!important')) {
        priority = 'important';
        value = value.replace('!important', '');
      }

      // support camelCase property name
      property = dasherize(property);

      this.element.style.setProperty(property, value, priority);

      if (rulesToRemove) {
        rulesToRemove.delete(property);
      }
    });

    if (rulesToRemove) {
      rulesToRemove.forEach(rule => this.element.style.removeProperty(rule));
    }
  }

  didReceiveArguments() {
    this.setStyles(this.styles);
  }
}
