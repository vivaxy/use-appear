# useAppear

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Standard Version][standard-version-image]][standard-version-url]
[![Codecov][codecov-image]][codecov-url]

⚛️React useAppear hook.

_(Created by [create-n](https://github.com/vivaxy/create-n).)_

# Install

`yarn add use-appear`

# Usage

```js
import * as React from 'react';
import useAppear from 'use-appear';

export default function AppearElement() {
  const [ref] = useAppear(function() {
    console.log('appear');
    return function() {
      console.log('disappear');
    };
  });

  return (
    <div ref={ref}>Element</div>
  );
}
```


[travis-image]: https://img.shields.io/travis/vivaxy/use-appear.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/use-appear
[npm-version-image]: https://img.shields.io/npm/v/use-appear.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/use-appear
[npm-downloads-image]: https://img.shields.io/npm/dt/use-appear.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/use-appear.svg?style=flat-square
[license-url]: LICENSE
[standard-version-image]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[standard-version-url]: https://github.com/conventional-changelog/standard-version
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/use-appear.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/use-appear
