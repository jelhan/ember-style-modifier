import { setModifierManager, capabilities } from '@ember/modifier';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

const isObject = o => typeof o === 'object' && Boolean(o);

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
const getStylesFromOptions = (positional, named) =>
  // This is a workaround for the missing `Array#flat` in IE11.
  [].concat(
    ...[...positional.filter(isObject), named].map(obj =>
      Object.entries(obj).map(([k, v]) => [dasherize(k), v])
    )
  );

function setStyles(element, newStyles, oldStyles) {
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

    element.style.setProperty(property, value, priority);

    if (rulesToRemove) {
      rulesToRemove.delete(property);
    }
  });

  if (rulesToRemove) {
    rulesToRemove.forEach(rule => element.style.removeProperty(rule));
  }
}

export default setModifierManager(
  () => ({
    capabilities: capabilities('3.13'),

    createModifier() {
      return {
        element: null,
        styles: {}
      };
    },

    installModifier(state, element, { positional, named }) {
      state.element = element;
      state.styles = getStylesFromOptions(positional, named);
      setStyles(element, state.styles);
    },

    updateModifier(state, { positional, named }) {
      const newStyles = getStylesFromOptions(positional, named);
      setStyles(state.element, newStyles, state.styles);
      state.styles = newStyles;
    },

    destroyModifier({ element, styles }) {
      setStyles(element, [], styles);
    }
  }),
  class StyleModifier {}
);
