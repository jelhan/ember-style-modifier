import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifiers | style', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets style on element', async function (assert) {
    await render(hbs`<p {{style display="none"}}></p>`);

    assert.dom('p').hasStyle({ display: 'none' });
  });

  test('it supports multiple styles', async function (assert) {
    await render(hbs`<p {{style display="none" float="left"}}></p>`);

    assert.dom('p').hasStyle({ display: 'none', float: 'left' });
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

  test('it supports dasherized and camelCase property names in same declaration', async function (assert) {
    await render(hbs`<p {{style font-size="6px" fontStyle="italic"}}></p>`);

    assert
      .dom('p')
      .hasStyle({ fontSize: '6px' })
      .hasStyle({ fontStyle: 'italic' });
  });

  test('it supports CSS variables', async function (assert) {
    await render(
      hbs`<p {{style --some-property="6px" font-size="var(--some-property)"}}></p>`,
    );

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports usage on SVG elements', async function (assert) {
    await render(hbs`<svg {{style display="none"}}></svg>`);

    assert.dom('svg').hasStyle({ display: 'none' });
  });

  test('it supports usage on math elements', async function (assert) {
    await render(hbs`<math {{style display="none"}}></math>`);

    assert.dom('math').hasStyle({ display: 'none' });
  });

  {
    interface Context extends TestContext {
      // eslint-disable-next-line @typescript-eslint/ban-types
      display: String;
    }

    test('it supports String object', async function (this: Context, assert) {
      this.set('display', new String('none'));
      await render<Context>(hbs`
        <p
          {{! @glint-expect-error: String wrapper object is not a valid CSS value type }}
          {{style display=this.display}}
        ></p>
      `);

      assert.dom('p').hasStyle({ display: 'none' });
    });
  }

  {
    interface Context extends TestContext {
      display: string;
    }

    test('it observers values for changes', async function (this: Context, assert) {
      this.set('display', 'none');
      await render<Context>(hbs`<p {{style display=this.display}}></p>`);

      assert.dom('p').hasStyle({ display: 'none' });

      this.set('display', 'inline');
      assert.dom('p').hasStyle({ display: 'inline' });
    });
  }

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

    {
      interface Context extends TestContext {
        styles: { [key: string]: string };
      }

      test('it supports dynamic property names', async function (this: Context, assert) {
        this.set('styles', { display: 'none' });

        await render<Context>(hbs`<p {{style this.styles}}></p>`);
        assert.dom('p').hasStyle({ display: 'none' });

        this.set('styles', {});
        assert.dom('p').hasAttribute('style', '');
      });

      test('it correctly handles dasherization over time', async function (this: Context, assert) {
        this.set('styles', { 'font-size': '12px' });

        await render<Context>(hbs`<p {{style this.styles}}></p>`);
        assert.dom('p').hasStyle({ fontSize: '12px' });

        this.set('styles', { fontSize: '10px' });
        assert.dom('p').hasStyle({ fontSize: '10px' });

        this.set('styles', {});
        assert.dom('p').hasAttribute('style', '');
      });
    }
  });

  module('assertions', function (hooks) {
    // Can't use assert.rejects() to assert that modifier throws
    // cause render does not reject:
    // https://github.com/emberjs/ember-test-helpers/issues/310
    // Using work-a-round recommended by rwjblue instead:
    // https://discuss.emberjs.com/t/how-to-catch-errors-in-component-rendering-test/14854

    let orgOnError: typeof Ember.onerror;
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

      await render(hbs`
        <p
          {{! @glint-expect-error: CSS values are (corretly) types as string or undefined }}
          {{style padding=1}}
        ></p>`);
      assert.verifySteps(['assertion thrown']);
    });
  });
});
