# @kyleshevlin/eslint-plugin

📢📢📢

**If you're here for the `prefer-custom-hooks` rule, please use [eslint-plugin-use-encapsulation](https://github.com/kyleshevlin/eslint-plugin-use-encapsulation) instead.**

📢📢📢

This is my personal collection of ESLint rules. It contains the following rules:

- `prefer-custom-hooks`
- `no-skipped-or-focused-tests`

Refer to each rule's READMEs in the `/docs/rules` directory.

## Installation

Install the plugin:

```
npm install --save-dev @kyleshevlin/eslint-plugin
```

Or

```
yarn add -D @kyleshevlin/eslint-plugin
```

And configure it in your ESLint config:

```javascript
{
  plugins: ['@kyleshevlin'],
  rules: [
    "@kyleshevlin/prefer-custom-hooks": "error",
    "@kyleshevlin/no-skipped-or-focused-tests": "error",
  ]
}
```
