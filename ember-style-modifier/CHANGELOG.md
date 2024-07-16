












## v4.4.0 (2024-07-16)

#### :rocket: Enhancement
* [#258](https://github.com/jelhan/ember-style-modifier/pull/258) Support @ember/string v4 ([@Techn1x](https://github.com/Techn1x))

#### Committers: 1
- Brad Overton ([@Techn1x](https://github.com/Techn1x))


## v4.3.1 (2024-03-10)

#### :bug: Bug Fix
* [#242](https://github.com/jelhan/ember-style-modifier/pull/242) @babel/core dependency is not needed ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## v4.3.0 (2024-02-13)

#### :rocket: Enhancement
* [#235](https://github.com/jelhan/ember-style-modifier/pull/235) Also allow using the modifier on SVG elements (types only) ([@boris-petrov](https://github.com/boris-petrov))

#### Committers: 1
- Boris Petrov ([@boris-petrov](https://github.com/boris-petrov))

## v4.2.0 (2024-02-05)

#### :rocket: Enhancement
* [#229](https://github.com/jelhan/ember-style-modifier/pull/229) Support Ember 3.28 and above (again) ([@jelhan](https://github.com/jelhan))
* [#218](https://github.com/jelhan/ember-style-modifier/pull/218) Convert addon to V2 ([@mkszepp](https://github.com/mkszepp))

#### :bug: Bug Fix
* [#219](https://github.com/jelhan/ember-style-modifier/pull/219) Setting CSS variables using styles modifier ([@boris-petrov](https://github.com/boris-petrov))

#### Committers: 3
- Boris Petrov ([@boris-petrov](https://github.com/boris-petrov))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- [@mkszepp](https://github.com/mkszepp)

## v4.1.0 (2024-01-11)

#### :rocket: Enhancement
* [#216](https://github.com/jelhan/ember-style-modifier/pull/216) improve typing of CSS styles using csstype package ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v4.0.0 (2024-01-10)

#### :boom: Breaking Change
* [#181](https://github.com/jelhan/ember-style-modifier/pull/181) drop support for Ember < 4.12 ([@jelhan](https://github.com/jelhan))
* [#180](https://github.com/jelhan/ember-style-modifier/pull/180) drop support for node 14 and 16 ([@jelhan](https://github.com/jelhan))

#### :rocket: Enhancement
* [#213](https://github.com/jelhan/ember-style-modifier/pull/213) document Ember compatibility adding a peer dep on ember-source ([@jelhan](https://github.com/jelhan))
* [#211](https://github.com/jelhan/ember-style-modifier/pull/211) better import path for apps using template tag ([@jelhan](https://github.com/jelhan))
* [#210](https://github.com/jelhan/ember-style-modifier/pull/210) Convert to TypeScript and publish types (including Glint) ([@jelhan](https://github.com/jelhan))

#### :house: Internal
* [#208](https://github.com/jelhan/ember-style-modifier/pull/208) upgrade with Ember CLI v5.5 blueprints ([@jelhan](https://github.com/jelhan))
* [#207](https://github.com/jelhan/ember-style-modifier/pull/207) migrate from yarn v1 to pnpm ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v3.1.1 (2024-01-10)

Published `v3.0.1` again to shadow `v3.1.0` release, which includes breaking changes.

## v3.0.1 (2023-02-15)

#### :bug: Bug Fix
* [#148](https://github.com/jelhan/ember-style-modifier/pull/148) Don't dasherize property names twice ([@drewpereli](https://github.com/drewpereli))

#### :house: Internal
* [#149](https://github.com/jelhan/ember-style-modifier/pull/149) ember-cli-update to v4.10 ([@jelhan](https://github.com/jelhan))

#### Committers: 2
- Drew Pereli ([@drewpereli](https://github.com/drewpereli))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v3.0.0 (2023-01-16)

#### :boom: Breaking Change
* [#139](https://github.com/jelhan/ember-style-modifier/pull/139) Add `@ember/string` as a dependency ([@boris-petrov](https://github.com/boris-petrov))

#### Committers: 1
- Boris Petrov ([@boris-petrov](https://github.com/boris-petrov))

## v2.1.0 (2023-01-13)

#### :house: Internal
* [#143](https://github.com/jelhan/ember-style-modifier/pull/143) upgrade files created by Ember CLI blueprints to 4.9 ([@jelhan](https://github.com/jelhan))
* [#142](https://github.com/jelhan/ember-style-modifier/pull/142) refactor pure method to pure function for readability ([@jelhan](https://github.com/jelhan))
* [#141](https://github.com/jelhan/ember-style-modifier/pull/141) use Array.flat() instead of complex workaround ([@jelhan](https://github.com/jelhan))
* [#140](https://github.com/jelhan/ember-style-modifier/pull/140) only loop once over styles ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v2.0.0 (2022-12-22)

ember-style-modifier v2 requires consuming application to have an explicit
dependency on ember-auto-import@v2. This is the only breaking change introduced.

Addon authors are encouraged to support both v1 and v2 of ember-style-modifier
in parallel. Instead of replacing ember-style-modifier@^1.0.0 dependency with a
dependency on ember-style-modifier@^2.0.0 widening the version range to
`^1.0.0 || ^2.0.0` is recommended. Widening the version range is _not_ a
change. Doing so allows applications to upgrade to ember-style-modifer@^2.0.0
as soon as all their direct and indirect addons support both.

#### :boom: Breaking Change
* [#133](https://github.com/jelhan/ember-style-modifier/pull/133) Add ember-auto-import v2 dependency ([@SergeAstapov](https://github.com/SergeAstapov))

#### :rocket: Enhancement
* [#133](https://github.com/jelhan/ember-style-modifier/pull/133) Widen ember-modifier versions to support v4 ([@SergeAstapov](https://github.com/SergeAstapov))

#### Committers: 1
- Sergey Astapov ([@SergeAstapov](https://github.com/SergeAstapov))

## v1.0.0 (2022-10-14)

#### :boom: Breaking Change
* [#112](https://github.com/jelhan/ember-style-modifier/pull/112) drop support for Ember 3.24 ([@jelhan](https://github.com/jelhan))
* [#111](https://github.com/jelhan/ember-style-modifier/pull/111) drop support for node 12 ([@jelhan](https://github.com/jelhan))

#### :house: Internal
* [#117](https://github.com/jelhan/ember-style-modifier/pull/117) document known limitations ([@jelhan](https://github.com/jelhan))
* [#114](https://github.com/jelhan/ember-style-modifier/pull/114) update blueprints to Ember CLI 4.7 ([@jelhan](https://github.com/jelhan))
* [#94](https://github.com/jelhan/ember-style-modifier/pull/94) Update Ember to v4.3 ([@bertdeblock](https://github.com/bertdeblock))
* [#93](https://github.com/jelhan/ember-style-modifier/pull/93) Update `.npmignore` file ([@bertdeblock](https://github.com/bertdeblock))
* [#92](https://github.com/jelhan/ember-style-modifier/pull/92) Update CI badge in README ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 2
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v0.8.0 (2022-04-08)

#### :rocket: Enhancement
* [#88](https://github.com/jelhan/ember-style-modifier/pull/88) Resolve `ember-modifier` deprecations ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## v0.7.0 (2021-10-27)

#### :boom: Breaking Change
* [#71](https://github.com/jelhan/ember-style-modifier/pull/71) add Ember Auto Import v2 ([@jelhan](https://github.com/jelhan))
* [#60](https://github.com/jelhan/ember-style-modifier/pull/60) Update dependency ember-modifier to v3 ([@renovate[bot]](https://github.com/apps/renovate))
* [#67](https://github.com/jelhan/ember-style-modifier/pull/67) drop support for Ember < 3.24 ([@jelhan](https://github.com/jelhan))
* [#57](https://github.com/jelhan/ember-style-modifier/pull/57) drop support for Ember 3.4 ([@jelhan](https://github.com/jelhan))
* [#58](https://github.com/jelhan/ember-style-modifier/pull/58) drop support for node 10 ([@jelhan](https://github.com/jelhan))

#### :house: Internal
* [#72](https://github.com/jelhan/ember-style-modifier/pull/72) fix CSP for Embroider builds ([@jelhan](https://github.com/jelhan))
* [#68](https://github.com/jelhan/ember-style-modifier/pull/68) upgrade addon blueprints to Ember CLI 3.28 ([@jelhan](https://github.com/jelhan))
* [#51](https://github.com/jelhan/ember-style-modifier/pull/51) Create ember-try scenarios for `no-deprecations` ([@mansona](https://github.com/mansona))
* [#39](https://github.com/jelhan/ember-style-modifier/pull/39) upgrade to Ember 3.24 ([@jelhan](https://github.com/jelhan))
* [#64](https://github.com/jelhan/ember-style-modifier/pull/64) finish all scenarios in CI even if one fails ([@jelhan](https://github.com/jelhan))
* [#28](https://github.com/jelhan/ember-style-modifier/pull/28) Upgrade Ember CLI to 3.21 ([@jelhan](https://github.com/jelhan))
* [#20](https://github.com/jelhan/ember-style-modifier/pull/20) Configure Renovate ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v0.6.0 (2020-08-03)

#### :boom: Breaking Change
* [#19](https://github.com/jelhan/ember-style-modifier/pull/19) Update ember-modifier to 2.1.0 and drop support for Ember < 3.4 ([@andreyfel](https://github.com/andreyfel))

#### Committers: 2
- Andrey Fel ([@andreyfel](https://github.com/andreyfel))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))

## v0.5.0 (2019-12-04)

#### :boom: Breaking Change
* [#12](https://github.com/jelhan/ember-style-modifier/pull/12) use public APIs through ember-modifier and upgrade dependencies ([@andreyfel](https://github.com/andreyfel))

#### :house: Internal
* [#14](https://github.com/jelhan/ember-style-modifier/pull/14) automate releases with release-it and lerna-changelog ([@jelhan](https://github.com/jelhan))
* [#12](https://github.com/jelhan/ember-style-modifier/pull/12) use public APIs through ember-modifier and upgrade dependencies ([@andreyfel](https://github.com/andreyfel))

#### Committers: 2
- Andrey Fel ([@andreyfel](https://github.com/andreyfel))
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v0.4.1 (2019-03-28)

#### :rocket: Enhancement
* [#10](https://github.com/jelhan/ember-style-modifier/pull/10) better assertion message for wrong value type ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v0.4.0 (2019-03-18)

#### :house: Internal
* [#8](https://github.com/jelhan/ember-style-modifier/pull/8) refactor: drop ember-functional-modifiers ([@buschtoens](https://github.com/buschtoens))

#### Committers: 1
- Jan Buschtöns ([@buschtoens](https://github.com/buschtoens))


## v0.3.0 (2019-03-13)

#### :rocket: Enhancement
* [#6](https://github.com/jelhan/ember-style-modifier/pull/6) support setting CSS rules using a POJO ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v0.2.0 (2019-03-12)

#### :boom: Breaking Change
* [#4](https://github.com/jelhan/ember-style-modifier/pull/4) support a more compact style for declaring CSS rules ([@jelhan](https://github.com/jelhan))

#### :rocket: Enhancement
* [#4](https://github.com/jelhan/ember-style-modifier/pull/4) support a more compact style for declaring CSS rules ([@jelhan](https://github.com/jelhan))

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))


## v0.1.0 (2019-03-11)

Initial proof of concept

#### Committers: 1
- Jeldrik Hanschke ([@jelhan](https://github.com/jelhan))
- 
