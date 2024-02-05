# ember-style-modifier

[![CI](https://github.com/jelhan/ember-style-modifier/workflows/CI/badge.svg)](https://github.com/jelhan/ember-style-modifier/actions?query=workflow%3ACI)
[![Ember Observer Score](http://emberobserver.com/badges/ember-style-modifier.svg)](http://emberobserver.com/addons/ember-style-modifier)
[![npm version](https://badge.fury.io/js/ember-style-modifier.svg)](https://badge.fury.io/js/ember-style-modifier)

This addon provides a `{{style}}` element modifier to set element's style.
This allows to set custom CSS of an element without requiring a [Content Security Policy](https://content-security-policy.com/) `style-src-attr: "unsafe-inline"`.

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v18 or above

## Installation

```sh
ember install ember-style-modifier
```

## Usage

It expects CSS declarations as named arguments or as a hash as positional
argument. Property names are supported in dasherized as well as in camelCase
spelling. Value must be a string or `undefined`. You may set a priority by
adding an `"!important"` suffix.

```hbs
<p
  {{style
    border="1px"
    padding="1em !important"
  }}
>
</p>

<p
  {{style
    (hash border="1px" padding="1em !important")
  }}
>
</p>
```

You may pass multiple hashes as positional arguments and combine hashes
with named arguments. If multiple hashes are passed and contain CSS
declarations for the same property, last one wins. If hashes and named
arguments declare same property, named argument wins.

Adding styles to pseudo-elements is not supported.

## Known limitations

Ember Style Modifier suffers from two known limitations of Modifiers
in Ember. Both need to be addressed by extending modifiers capabilities.
Doing so, is discussed in a [RFC issue](https://github.com/emberjs/rfcs/issues/652).

### Server-side rendering is not supported

Modifiers do not run in server-side rendering (SSR). Styles set using
`ember-style-modifier` are therefore _not_ applied if application is
run with [FastBoot](http://ember-fastboot.com/) or prerendered using
[Prember](https://github.com/ef4/prember). This may lead to wrong
layout _before_ rehydration and layout shifts on rehydration.

### Browser may paint the element twice on initial render

Modifiers run _after_ browser has printed the page. If styles are
applied to an elements immediately, the browser first renders the
element _without_ those styles applied and immediately afterwards
with these styles applied.

This may theoretically cause the experience of a flickering user
interface. But such a case has not been noticed yet in practice.

Rendering the element twice has a performance impact. But it should
not have any noticeable impact in practice.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
