import '@glint/environment-ember-loose';
import EmberStyleModifierRegistry from '../template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberStyleModifierRegistry {}
}
