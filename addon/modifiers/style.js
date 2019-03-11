import makeFunctionalModifier from 'ember-functional-modifiers';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { isPresent, typeOf } from '@ember/utils';

export default makeFunctionalModifier((element, [property, value, priority]) => {
  assert('must pass a property name as first argument', isPresent(property));
  assert('property name must be a string', typeOf(property) === 'string');
  assert('value must be a string if provided', value === undefined || typeOf(value) === 'string');
  assert('value must not contain "!important", pass a priority argument instead', typeOf(value) !== 'string' || value.indexOf('!important') === -1);
  assert('priority must be "important" if provided', priority === undefined || priority.toString() === 'important');

  // Support EmberString
  property = property.toString();
  value = value ? value.toString() : undefined;
  priority = priority ? 'important' : undefined;

  // support camelCase property name
  property = dasherize(property);

  element.style.setProperty(property, value, priority);
});
