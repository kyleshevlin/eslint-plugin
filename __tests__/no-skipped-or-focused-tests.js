const rule = require('../rules/no-skipped-or-focused-tests')
const RuleTester = require('eslint').RuleTester

const rt = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})

rt.run('no-skipped-or-focused-tests', rule, {
  valid: [
    { code: 'describe(() => {})' },
    { code: 'it(() => {})' },
    { code: 'test(() => {})' },
    { code: 'var x = { describe: 1 }' },
    { code: 'var x = { fdescribe: 1 }' },
    { code: 'var x = { fit: 1 }' },
    { code: 'var x = { it: 1 }' },
    { code: 'var x = { test: 1 }' },
    { code: 'var x = { xdescribe: 1 }' },
    { code: 'var x = { xit: 1 }' },
    { code: 'var x = { xtest: 1 }' },
  ],
  invalid: [
    {
      code: 'describe.only(() => {})',
      errors: ['Do not use "describe.only".'],
    },
    {
      code: 'describe.skip(() => {})',
      errors: ['Do not use "describe.skip".'],
    },
    {
      code: 'fdescribe(() => {})',
      errors: ['Do not use "fdescribe".'],
    },
    {
      code: 'fit(() => {})',
      errors: ['Do not use "fit".'],
    },
    {
      code: 'it.only(() => {})',
      errors: ['Do not use "it.only".'],
    },
    {
      code: 'it.skip(() => {})',
      errors: ['Do not use "it.skip".'],
    },
    {
      code: 'test.only(() => {})',
      errors: ['Do not use "test.only".'],
    },
    {
      code: 'test.skip(() => {})',
      errors: ['Do not use "test.skip".'],
    },
    {
      code: 'xdescribe(() => {})',
      errors: ['Do not use "xdescribe".'],
    },
    {
      code: 'xit(() => {});',
      errors: ['Do not use "xit".'],
    },
    {
      code: 'xtest(() => {});',
      errors: ['Do not use "xtest".'],
    },
  ],
})
