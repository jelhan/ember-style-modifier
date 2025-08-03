import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, rerender } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { TrackedObject } from 'tracked-built-ins';

import style from '#src/modifiers/style.ts';

module('Integration | Modifiers | style', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets style on element', async function (assert) {
    await render(
      <template>
        <p {{style display="none"}}></p>
      </template>,
    );

    assert.dom('p').hasStyle({ display: 'none' });
  });

  test('it supports multiple styles', async function (assert) {
    await render(
      <template>
        <p {{style display="none" float="left"}}></p>
      </template>,
    );

    assert.dom('p').hasStyle({ display: 'none', float: 'left' });
  });

  test('it allows to set priority', async function (assert) {
    await render(
      <template>
        <p {{style display="none !important"}}></p>
      </template>,
    );

    assert.dom('p').hasAttribute('style', 'display: none !important;');
  });

  test('it does not set custom style if value is undefined', async function (assert) {
    await render(
      <template>
        <p {{style display=undefined}}></p>
      </template>,
    );

    assert.dom('p').hasNoAttribute('style');
  });

  test('it supports dasherized property name', async function (assert) {
    await render(
      <template>
        <p {{style font-size="6px"}}></p>
      </template>,
    );

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports camelCase property name', async function (assert) {
    await render(
      <template>
        <p {{style fontSize="6px"}}></p>
      </template>,
    );

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports dasherized and camelCase property names in same declaration', async function (assert) {
    await render(
      <template>
        <p {{style font-size="6px" fontStyle="italic"}}></p>
      </template>,
    );

    assert
      .dom('p')
      .hasStyle({ fontSize: '6px' })
      .hasStyle({ fontStyle: 'italic' });
  });

  test('it supports CSS variables', async function (assert) {
    await render(
      <template>
        <p {{style --some-property="6px" font-size="var(--some-property)"}}></p>
      </template>,
    );

    assert.dom('p').hasStyle({ fontSize: '6px' });
  });

  test('it supports usage on SVG elements', async function (assert) {
    await render(
      <template>
        <svg {{style display="none"}}></svg>
      </template>,
    );

    assert.dom('svg').hasStyle({ display: 'none' });
  });

  {
    test('it supports String object', async function (this, assert) {
      const display = new String('none');
      await render(
        <template>
          {{!-- {{! @glint-expect-error: String wrapper object is not a valid CSS value type }} re-enable this when https://github.com/typed-ember/glint/issues/930 is fixed --}}
          <p {{style display=display}}></p>
        </template>,
      );

      assert.dom('p').hasStyle({ display: 'none' });
    });
  }

  {
    test('it observers values for changes', async function (this, assert) {
      class Context {
        @tracked display = 'none';
      }

      const context = new Context();

      await render<Context>(
        <template>
          <p {{style display=context.display}}></p>
        </template>,
      );

      assert.dom('p').hasStyle({ display: 'none' });

      context.display = 'inline';

      await rerender();

      assert.dom('p').hasStyle({ display: 'inline' });
    });
  }

  module('options hash', function () {
    test('it accepts an option hash as alternative to named arguments', async function (assert) {
      await render(
        <template>
          <p {{style (hash display="none")}}></p>
        </template>,
      );

      assert.dom('p').hasStyle({ display: 'none' });
    });

    test('options hash and named arguments could be used together', async function (assert) {
      await render(
        <template>
          <p {{style (hash padding="6px") margin="12px"}}></p>
        </template>,
      );

      assert.dom('p').hasStyle({ padding: '6px', margin: '12px' });
    });

    test('named arguments overrule option hash', async function (assert) {
      await render(
        <template>
          <p {{style (hash display="none") display="inline"}}></p>
        </template>,
      );

      assert.dom('p').hasStyle({ display: 'inline' });
    });

    test('differently dasherized named arguments overrule option hash', async function (assert) {
      await render(
        <template>
          <p
            {{style
              (hash font-size="10px" textAlign="left")
              fontSize="12px"
              text-align="right"
            }}
          ></p>
        </template>,
      );

      assert.dom('p').hasStyle({ fontSize: '12px', textAlign: 'right' });
    });

    test('supports multiple hashes', async function (assert) {
      await render(
        <template>
          <p
            {{style
              (hash display="inline" font-size="12px")
              (hash display="inline-block")
            }}
          ></p>
        </template>,
      );

      assert.dom('p').hasStyle({ display: 'inline-block', fontSize: '12px' });
    });

    {
      test('it supports dynamic property names', async function (this, assert) {
        class Context {
          styles = new TrackedObject<Record<string, string>>({
            display: 'none',
          });
        }

        const context = new Context();

        await render(
          <template>
            <p {{style context.styles}}></p>
          </template>,
        );
        assert.dom('p').hasStyle({ display: 'none' });

        delete context.styles.display;

        await rerender();
        assert.dom('p').hasAttribute('style', '');
      });

      test('it correctly handles dasherization over time', async function (this, assert) {
        class Context {
          styles = new TrackedObject<Record<string, string>>({
            'font-size': '12px',
          });
        }

        const context = new Context();

        await render(
          <template>
            <p {{style context.styles}}></p>
          </template>,
        );
        assert.dom('p').hasStyle({ fontSize: '12px' });

        context.styles['font-size'] = '10px';
        await rerender();
        assert.dom('p').hasStyle({ fontSize: '10px' });

        delete context.styles['font-size'];
        await rerender();

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

      await render(
        <template>
          {{!-- {{! @glint-expect-error: CSS values are (correctly) types as string or undefined }} re-enable this when https://github.com/typed-ember/glint/issues/930 is fixed --}}
          <p {{style padding=1}}></p>
        </template>,
      );
      assert.verifySteps(['assertion thrown']);
    });
  });
});
