# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.0-alpha.10](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2024-03-26)


### Bug Fixes

* ts decalation error ([76f449a](https://github.com/snowyu/events-ex.js/commit/76f449a21a88ac2762b3e63ef05133a72d0560f8))

## [2.0.0-alpha.9](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2024-03-26)


### Features

* add type(event) to Event(this) for listener ([42b35e7](https://github.com/snowyu/events-ex.js/commit/42b35e75bf224b79d3b967469a7beb4f5aa120d1))

## [2.0.0-alpha.8](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2024-03-20)


### Features

* add eventName to the notify error event ([da3be72](https://github.com/snowyu/events-ex.js/commit/da3be7238689da19589e4d3a104d57b749d8a771))

## [2.0.0-alpha.7](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2024-03-20)


### Features

* The listener throw error should not broke the notification, but it will emit error after notification. ([7dce4f6](https://github.com/snowyu/events-ex.js/commit/7dce4f68c516a0169fa4f64f3a5c5277f0c2b743))

## [2.0.0-alpha.6](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2024-03-15)

## [2.0.0-alpha.5](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2024-03-15)


### Bug Fixes

* webpack5 Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' ([943ef69](https://github.com/snowyu/events-ex.js/commit/943ef69c20b42687dd4dd6276a808b88a063ea63))

## [2.0.0-alpha.4](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2023-12-31)


### Bug Fixes

* add message parameter to Error object if exists ([8b7be69](https://github.com/snowyu/events-ex.js/commit/8b7be691a7ede7772d4150ae24aafe6e2d901ad4))

## [2.0.0-alpha.3](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2023-08-27)


### Features

* add ABORT state constant ([a8b3710](https://github.com/snowyu/events-ex.js/commit/a8b3710ae7f1695263ed0bd9036db31831ed9ae0))

## [2.0.0-alpha.2](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2023-06-13)


### ⚠ BREAKING CHANGES

* rename src/event-emitter to src/wrap-event-emitter and extract EventEmitter from index to event-emitter

### Bug Fixes

* **ts:** EventEmitter not found ([9a74862](https://github.com/snowyu/events-ex.js/commit/9a748624e00417f6d7f72ea7c297650e10895d19))


### Refactor

* rename src/event-emitter to src/wrap-event-emitter and extract EventEmitter from index to event-emitter ([f06f39f](https://github.com/snowyu/events-ex.js/commit/f06f39fb809006f5e098e31bb23870fff39ec5c8))

## [2.0.0-alpha.1](https://github.com/snowyu/events-ex.js/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2023-06-13)


### ⚠ BREAKING CHANGES

* remove deprecated files

### Refactor

* remove deprecated files ([d733a5c](https://github.com/snowyu/events-ex.js/commit/d733a5c6a6c554739ecbcb653996f1e546579fa4))

## [2.0.0-alpha.0](https://github.com/snowyu/events-ex.js/compare/v1.1.7...v2.0.0-alpha.0) (2023-05-25)


### Features

* Add emitAsync supports ([c5a52e9](https://github.com/snowyu/events-ex.js/commit/c5a52e93e707b3f9f62b2d39eeb1e4870c0af185))
* Add emitAsync supports ([97d44df](https://github.com/snowyu/events-ex.js/commit/97d44dfb5b2d5cda34848aaff4ea94c5af67b8f6))
* **util:** extract util functions to here ([5bedb98](https://github.com/snowyu/events-ex.js/commit/5bedb98486dfa50c09f51d0fc669beb43b39c3b6))


### Refactor

* **benchmark:** use esm instead of commonjs ([366039e](https://github.com/snowyu/events-ex.js/commit/366039e9ddb8723db8d8a8257436f34af0a8ece8))
* change exported name to wrapEventEmitter ([b0be8e7](https://github.com/snowyu/events-ex.js/commit/b0be8e72826fa189d03831c747367cfd8b8a6f78))
* **consts:** change export name to states ([bf5c926](https://github.com/snowyu/events-ex.js/commit/bf5c9268ae29956d7281b4a1fc101952ef81896a))
* **test:** use mocha instead of tad ([74261eb](https://github.com/snowyu/events-ex.js/commit/74261ebf632274eed90796d84c8f2df3352e62fb))
* use esm instead of commonjs ([b1f55dc](https://github.com/snowyu/events-ex.js/commit/b1f55dcd15d6e91ec639baa022de68ae874bf109))
