import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StyleModifier from 'dummy/modifiers/style';
import { affectedStylesStore } from 'ember-style-modifier/modifiers/style';
/* global Ember */

module('Integration | Modifiers | style', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('modifier:style', StyleModifier);
  });

  test('it sets style on element', async function(assert) {
    await render(hbs`<p {{style display="none"}}></p>`);

    assert.dom('p').hasStyle({ display: "none" });
  });

  test('it allows to set priority', async function(assert) {
    await render(hbs`<p {{style display="none !important"}}></p>`);

    assert.dom('p').hasAttribute("style", "display: none !important;");
  });

  test('it does not set custom style if value is undefined', async function(assert) {
    await render(hbs`<p {{style display=undefined}}></p>`);

    assert.dom('p').hasNoAttribute("style");
  });

  test('it could be used multiple times on same element', async function(assert) {
    await render(hbs`
      <p {{style margin="1px"}} {{style padding="1px"}}></p>
    `);

    assert.dom('p').hasStyle({ margin: "1px", padding: "1px" });
  });

  test('last modifier wins if used multiple times with same property on same element', async function(assert) {
    await render(hbs`<p {{style display="none"}} {{style display="inline"}}></p>`);

    assert.dom('p').hasStyle({ display: "inline" });
  });

  test('it supports dasherized property name', async function(assert) {
    await render(hbs`<p {{style font-size="6px"}}></p>`);

    assert.dom('p').hasStyle({ fontSize: "6px" });
  });

  test('it supports camelCase property name', async function(assert) {
    await render(hbs`<p {{style fontSize="6px"}}></p>`);

    assert.dom('p').hasStyle({ fontSize: "6px" });
  });

  test('it supports String object', async function(assert) {
    this.set('display', new String("none"));
    await render(hbs`<p {{style display=display}}></p>`);

    assert.dom('p').hasStyle({ display: "none" });
  });

  test('it observers values for changes', async function(assert) {
    this.set('display', 'none');
    await render(hbs`<p {{style display=display}}></p>`);

    assert.dom('p').hasStyle({ display: "none" });

    this.set('display', 'inline');
    assert.dom('p').hasStyle({ display: "inline" });
  });

  module('options hash', function() {
    test('it accepts an option hash as alternative to named arguments', async function(assert) {
      await render(hbs`<p {{style (hash display="none")}}></p>`);

      assert.dom('p').hasStyle({ display: "none" });
    });

    test('named arguments overrule option hash', async function(assert) {
      await render(hbs`<p {{style (hash display="none") display="inline"}}></p>`);

      assert.dom('p').hasStyle({ display: "inline" });
    });

    test('it supports dynamic property names', async function(assert) {
      this.set('styles', { display: "none" });

      await render(hbs`<p {{style styles}}></p>`);
      assert.dom('p').hasStyle({ display: "none" });

      this.set('styles', {});
      assert.dom('p').hasAttribute("style", "");
    });

    test('it removes element from store if it\'s removed from DOM', async function(assert) {
      this.set('show', true);
      await render(hbs`{{#if show}}<p {{style display="none"}}></p>{{/if}}`);

      let element = this.element.querySelector('p');
      assert.ok(affectedStylesStore.has(element), 'assumption');

      this.set('show', false);
      assert.notOk(affectedStylesStore.has(element), 'assumption');
    });
  });

  module('assertions', function(hooks) {
    // Can't use assert.rejects() to assert that modifier throws
    // cause render does not reject:
    // https://github.com/emberjs/ember-test-helpers/issues/310
    // Using work-a-round recommended by rwjblue instead:
    // https://discuss.emberjs.com/t/how-to-catch-errors-in-component-rendering-test/14854

    let orgOnError;
    hooks.beforeEach(function() {
      orgOnError = Ember.onerror;
    });
    hooks.afterEach(function() {
      Ember.onerror = orgOnError;
    });

    test('it throws if value is not a string', async function(assert) {
      assert.expect(1);

      Ember.onerror = function() {
        assert.ok(true);
      };

      await render(hbs`<p {{style padding=1}}></p>`)
    });
  });
});
