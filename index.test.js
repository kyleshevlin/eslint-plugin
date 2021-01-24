const rule = require('./index')
const { REACT_HOOKS } = require('./constants')
const RuleTester = require('eslint').RuleTester

const rt = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})

const HOOKS = Array.from(REACT_HOOKS)

const inFunctionCustomHook = hook =>
  `function useCustomHook() { ${hook}(); return null; }`

const inArrowFunctionCustomHook = hook =>
  `const useCustomHook = () => { ${hook}(); return null; }`

const inFunctionComponent = hook => `function Comp() { ${hook}(); return null }`

const inArrowFunctionComponent = hook =>
  `const Comp = () => { ${hook}(); return null; }`

const expectedError =
  'Do not use React Hooks directly in a component. Abstract the functionality into a custom hook and use that instead.'

rt.run('prefer-custom-hooks', rule, {
  valid: [
    ...HOOKS.map(inFunctionCustomHook),
    ...HOOKS.map(hook => inFunctionCustomHook(`React.${hook}`)),
    ...HOOKS.map(inArrowFunctionCustomHook),
    ...HOOKS.map(hook => inArrowFunctionCustomHook(`React.${hook}`)),
    inFunctionComponent('useCustomHook'),
    inArrowFunctionComponent('useCustomHook'),
  ],
  invalid: [
    ...HOOKS.map(hook => ({
      code: inFunctionComponent(hook),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inFunctionComponent(`React.${hook}`),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inArrowFunctionComponent(hook),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inArrowFunctionComponent(`React.${hook}`),
      errors: [expectedError],
    })),
  ],
})
