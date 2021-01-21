# eslint-plugin-prefer-custom-hooks

This ESLint plugin is designed to encourage you to use custom hooks in your React components instead of using React Hooks directly.

## Installation

Install the plugin:

```
npm i --save-dev eslint-plugin-prefer-custom-hooks
```

And declare it in your ESLint config:

```
{
  plugins: ['prefer-custom-hooks'],
  rules: [
    "prefer-custom-hooks": "error"
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
