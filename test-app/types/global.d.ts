import '@glint/environment-ember-loose';
import EmberStyleModifierRegistry from 'ember-style-modifier/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberStyleModifierRegistry {}
}