# @kyleshevlin/eslint-plugin

This ESLint plugin has a single rule, `prefer-custom-hooks`. It is designed to encourage the use of custom hooks in your React components instead of using React Hooks directly. This encourages correct encapsulation of all related elements of the hook's concern.

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

```
{
  plugins: ['@kyleshevlin'],
  rules: [
    "@kyleshevlin/prefer-custom-hooks": "error"
  ]
}
```

## Incorrect

Here we are using React Hooks directly inside a component with no custom hook abstraction.

```jsx
function MyComponent() {
  const [state, setState] = React.useState(false)
  const toggle = React.useCallback(() => {
    setState(s => !s)
  }, [])

  return <button onClick={toggle}>{String(state)}<button>
}
```

## Correct

Here we abstract the functionality into a custom hook, encapsulating the concerns of `state` and its `handlers` together.

```jsx
function useBool() {
  const [state, setState] = React.useState(false)
  const handlers = React.useMemo(
    () => ({
      toggle: () => {
        setState(s => !s)
      },
    }),
    []
  )

  return [state, handlers]
}

function MyComponent() {
  const [state, { toggle }] = useBool()

  return <button onClick={toggle}>{String(state)}</button>
}
```

## Further Reading

I discuss this concept in depth in my [useEncapsulation](https://kyleshevlin.com/use-encapsulation) blog post.
