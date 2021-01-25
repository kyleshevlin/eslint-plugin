# @kyleshevlin/eslint-plugin

This ESLint plugin has a single rule, `prefer-custom-hooks`. It is designed to encourage you to use custom hooks in your React components instead of using React Hooks directly.

## Installation

Install the plugin:

```
npm i --save-dev @kyleshevlin/eslint-plugin
```

And configure it in your ESLint config:

```
{
  plugins: ['kyleshevlin'],
  rules: [
    "kyleshevlin/prefer-custom-hooks": "error"
  ]
}
```

## Incorrect

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
