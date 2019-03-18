# ember-style-modifier

[![Build Status](https://travis-ci.org/jelhan/ember-style-modifier.svg?branch=master)](https://travis-ci.org/jelhan/ember-style-modifier)

This addon provides a `{{style}}` element modifier to set element's style.
This allows to set custom CSS of an element without requiring a [Content Security Policy](https://content-security-policy.com/) `style-src-attr: "unsafe-inline"`.

## Compatibility

It supports the same versions as [`ember-modifier-manager-polyfill`](https://github.com/rwjblue/ember-modifier-manager-polyfill#compatibility) does.

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

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
