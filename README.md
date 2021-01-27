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
function Counter() {
  const [state, setState] = React.useState(0)

  const inc = React.useCallback(() => {
    setState(s => s + 1)
  })

  const dec = React.useCallback(() => {
    setState(s => s - 1)
  })

  const reset = React.useCallback(() => {
    setState(0)
  })

  return (
    <div>
      <div>Count: {state}</div>
      <div>
        <button type="button" onClick={inc}>
          +
        </button>
        <button type="button" onClick={dec}>
          -
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  )
}
```

## Correct

Here we abstract the functionality into a custom hook, encapsulating the concerns of `state` and its `handlers` together.

```jsx
function useCounter(initialState = 0) {
  const [state, setState] = React.useState(initialState)

  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState(s => s + 1)
      },
      dec: () => {
        setState(s => s - 1)
      },
      reset: () => {
        setState(initialState)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}

function Counter() {
  const [state, { inc, dec, reset }] = useCounter()

  return (
    <div>
      <div>Count: {state}</div>
      <div>
        <button type="button" onClick={inc}>
          +
        </button>
        <button type="button" onClick={dec}>
          -
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  )
}
```

## Further Reading

I discuss this concept in depth in my [useEncapsulation](https://kyleshevlin.com/use-encapsulation) blog post.
