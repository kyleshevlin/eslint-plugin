# No Skipped or Focused Tests

This rule can be used to detect whenever a test is skipped or focused with the following:

- `describe.only`
- `describe.skip`
- `fdescribe`
- `fit`
- `it.only`
- `it.skip`
- `test.only`
- `test.skip`
- `xdescribe`
- `xit`
- `xtest`

The primary purpose of this rule is to prevent the committing of skipped or focused tests without expressly allowing it.

## Rule Details

The following patterns are considered an error:

```js
describe.only(() => {})
describe.skip(() => {})
fdescribe(() => {})
fit(() => {})
it.only(() => {})
it.skip(() => {})
test.only(() => {})
test.skip(() => {})
xdescribe(() => {})
xit(() => {})
xtest(() => {})
```

## Exceptions

It is sometimes necessary to skip tests, ex. pushing a hot fix to production. In this scenario, please use an ESLint disabling comment.

```javascript
// eslint-disable-next-line @kyleshevlin/no-skipped-or-focused-tests
```
