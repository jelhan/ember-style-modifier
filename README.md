ember-style-modifier
==============================================================================

This addon provides a `{{style}}` element modifier to set element's style.
This allows to set custom CSS of an element without requiring a [Content Security Policy](https://content-security-policy.com/) `style-src-attr: "unsafe-inline"`.

Compatibility
------------------------------------------------------------------------------

It supports the same versions as [`ember-functional-modifiers`](https://github.com/spencer516/ember-functional-modifiers#compatibility) does.

Installation
------------------------------------------------------------------------------

```sh
ember install ember-style-modifier
```

Usage
------------------------------------------------------------------------------

```hbs
<p {{style "border" "1px"}} {{style "padding" "1em" "important"}}></p>
```

Public API is designed after [`CSSStyleDeclaration.setProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) method.
It expects a property name as first and value as second positional argument.
Style is removed if value is `undefined`.
You may pass a priority as third argument, which must be `"important"` if provided.

**Warning**: You should not pass a dynamic property name as it doesn't remove
existing style rules if property name changes.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
