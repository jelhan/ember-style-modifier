import makeFunctionalModifier from 'ember-functional-modifiers';
import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

// Store holds information which properties were set
// for an element (key) in last run. This allows us
// to clean up properties that were set but aren't
// present in options hash anymore.
const STORE = new WeakMap();

export default makeFunctionalModifier((element, [optionsHash = {}], namedOptions = {}) => {
  let options = assign({}, optionsHash, namedOptions);
  let properties = [];

  for (let property in options) {
    let value = options[property];
    assert(`Value must be a string or undefined, ${typeOf(value)} given`, value === undefined || typeOf(value) === "string");

    // priorty must be specified as separate argument
    // value must not contain "!important"
    let priority = "";
    if (value && value.includes("!important")) {
      priority = "important";
      value = value.replace("!important", "");
    }

    // support camelCase property name
    property = dasherize(property);

    element.style.setProperty(property, value, priority);

    properties.push(property);
  }

  // remove styles that were set in last run but aren't present in this run anymore
  if (STORE.has(element)) {
    let previousProps = STORE.get(element);
    let removedProps = previousProps.filter((_) => !properties.includes(_));

    removedProps.forEach((prop) => {
      element.style.removeProperty(prop);
    });
  }

  // store properties set on element for next run
  STORE.set(element, properties);
});
