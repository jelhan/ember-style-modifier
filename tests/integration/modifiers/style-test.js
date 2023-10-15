import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifiers | style', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets style on element', async function (assert) {
    await render(hbs`<p {{style display="none"}}></p>`);

    assert.dom('p').hasStyle({ display: 'none' });
  });

  test('it allows to set priority', async function (assert) {
    await render(hbs`<p {{style display="none !important"}}></p>`);

    assert.dom('p').hasAttribute('style', 'display: none !important;');
  });

  test('it does not set custom style if value is undefined', async function (assert) {
    await render(hbs`<p {{style display=undefined}}></p>`);

    assert.dom('p').hasNoAttribute('style');
  });

  test('it supports dasherized property name', async function (assert) {
    await render(hbs`<p {{style font-size="6px"}}></p>`);

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports camelCase property name', async function (assert) {
    await render(hbs`<p {{style fontSize="6px"}}></p>`);

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports String object', async function (assert) {
    this.set('display', new String('none'));
    await render(hbs`<p {{style display=this.display}}></p>`);

    assert.dom('p').hasStyle({ display: 'none' });
  });

  test('it observers values for changes', async function (assert) {
    this.set('display', 'none');
    await render(hbs`<p {{style display=this.display}}></p>`);

    assert.dom('p').hasStyle({ display: 'none' });

    this.set('display', 'inline');
    assert.dom('p').hasStyle({ display: 'inline' });
  });

  module('options hash', function () {
    test('it accepts an option hash as alternative to named arguments', async function (assert) {
      await render(hbs`<p {{style (hash display="none")}}></p>`);

      assert.dom('p').hasStyle({ display: 'none' });
    });

    test('options hash and named arguments could be used together', async function (assert) {
      await render(hbs`<p {{style (hash padding="6px") margin="12px"}}></p>`);

      assert.dom('p').hasStyle({ padding: '6px', margin: '12px' });
    });

    test('named arguments overrule option hash', async function (assert) {
      await render(
        hbs`<p {{style (hash display="none") display="inline"}}></p>`,
      );

      assert.dom('p').hasStyle({ display: 'inline' });
    });

    test('differently dasherized named arguments overrule option hash', async function (assert) {
      await render(
        hbs`<p {{style (hash font-size="10px" textAlign="left") fontSize="12px" text-align="right"}}></p>`,
      );

      assert.dom('p').hasStyle({ fontSize: '12px', textAlign: 'right' });
    });

    test('supports multiple hashes', async function (assert) {
      await render(
        hbs`<p {{style (hash display="inline" font-size="12px") (hash display="inline-block")}}></p>`,
      );

      assert.dom('p').hasStyle({ display: 'inline-block', fontSize: '12px' });
    });

    test('it supports dynamic property names', async function (assert) {
      this.set('styles', { display: 'none' });

      await render(hbs`<p {{style this.styles}}></p>`);
      assert.dom('p').hasStyle({ display: 'none' });

      this.set('styles', {});
      assert.dom('p').hasAttribute('style', '');
    });

    test('it correctly handles dasherization over time', async function (assert) {
      this.set('styles', { 'font-size': '12px' });

      await render(hbs`<p {{style this.styles}}></p>`);
      assert.dom('p').hasStyle({ fontSize: '12px' });

      this.set('styles', { fontSize: '10px' });
      assert.dom('p').hasStyle({ fontSize: '10px' });

      this.set('styles', {});
      assert.dom('p').hasAttribute('style', '');
    });
  });

  module('assertions', function (hooks) {
    // Can't use assert.rejects() to assert that modifier throws
    // cause render does not reject:
    // https://github.com/emberjs/ember-test-helpers/issues/310
    // Using work-a-round recommended by rwjblue instead:
    // https://discuss.emberjs.com/t/how-to-catch-errors-in-component-rendering-test/14854

    let orgOnError;
    hooks.beforeEach(function () {
      orgOnError = Ember.onerror;
    });
    hooks.afterEach(function () {
      Ember.onerror = orgOnError;
    });

    test('it throws if value is not a string', async function (assert) {
      Ember.onerror = function ({ message }) {
        assert.step('assertion thrown');
        assert.ok(message.includes('number'), 'message includes type of value');
        assert.ok(message.includes('1'), 'message includes value');
      };

      await render(hbs`<p {{style padding=1}}></p>`);
      assert.verifySteps(['assertion thrown']);
    });
  });
});
