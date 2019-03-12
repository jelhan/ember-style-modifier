ember-style-modifier
==============================================================================

[![Build Status](https://travis-ci.org/jelhan/ember-style-modifier.svg?branch=master)](https://travis-ci.org/jelhan/ember-style-modifier)

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
<p {{style border="1px" padding="1em !important"}}></p>
```

It expects CSS declarations as named arguments. Property names are supported
in dasherized as well as in camelCase spelling. Value must be a string or
`undefined`. You may set a priority by adding an `"!important"` suffix.

Adding styles to pseudo-elements is not supported so far.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
