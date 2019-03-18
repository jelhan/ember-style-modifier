import Ember from 'ember';
import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

const isObject = o => typeof o === 'object' && Boolean(o);

const getStylesFromOptions = (positional, named) =>
  assign({}, ...positional.filter(isObject), named);

function setStyles(element, newStyles, oldStyles) {
  const rulesToRemove = oldStyles ? new Set(Object.keys(oldStyles)) : null;

  Object.entries(newStyles).forEach(([property, value]) => {
    assert(
      `Value must be a string or undefined, ${typeOf(value)} given`,
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

export default Ember._setModifierManager(
  () => ({
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
      setStyles(element, {}, styles);
    }
  }),
  class OnModifier {}
);
