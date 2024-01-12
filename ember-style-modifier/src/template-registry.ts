import StyleModifier from './modifiers/style.ts';

export default interface EmberStyleModifierRegistry {
  style: typeof StyleModifier;
}
