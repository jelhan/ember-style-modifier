import makeFunctionalModifier from 'ember-functional-modifiers';
import { assign } from '@ember/polyfills';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

const affectedStylesStore = new WeakMap();

// store is only exported for testing and should be considered private API
export { affectedStylesStore };

export default makeFunctionalModifier((element, [optionsHash = {}], namedOptions = {}) => {
  let options = assign({}, optionsHash, namedOptions);

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
  }

  // remove styles that were set in last run but aren't present in this run anymore
  // this only affects properties assigned by optionsHash by design cause named
  // arguments can't disappear
  let propertiesSetByHash = Object.keys(optionsHash).map((_) => dasherize(_));
  if (affectedStylesStore.has(element)) {
    let previousProps = affectedStylesStore.get(element);
    let removedProps = previousProps.filter((_) => !propertiesSetByHash.includes(_));

    removedProps.forEach((prop) => {
      element.style.removeProperty(prop);
    });
  }

  // store styles set via optionsHash for next run
  affectedStylesStore.set(element, propertiesSetByHash);

  // remove reference to element from affectedStylesStore
  // if element is removed from DOM to avoid a memory leak
  // TODO: This might not be needed at all for a WeakMap.
  return (isRemoving) => {
    if (isRemoving) {
      affectedStylesStore.delete(element);
    }
  };
});
