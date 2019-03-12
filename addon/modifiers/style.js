import makeFunctionalModifier from 'ember-functional-modifiers';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';

export default makeFunctionalModifier((element, positionalArguments, options = {}) => {
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

    // Support EmberString
    property = property.toString();
    value = value ? value.toString() : undefined;

    // support camelCase property name
    property = dasherize(property);

    element.style.setProperty(property, value, priority);
  }
});
