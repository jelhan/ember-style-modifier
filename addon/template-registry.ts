import type StyleModifier from './modifiers/style';

export default interface EmberStyleModifierRegistry {
  style: typeof StyleModifier;
}
