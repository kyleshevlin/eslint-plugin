# Prefer Custom Hooks

This rule does not allow using the hooks provided by the React library directly inside a component. They can only be used by custom hooks, encouraging the use of custom hooks in your components.

## Fail

```javascript
function MyComponent() {
  React.useEffect(() => {})
  return null
}
function MyComponent() {
  useEffect(() => {})
  return null
}
const MyComponent = () => {
  React.useEffect(() => {})
  return null
}
const MyComponent = () => {
  useEffect(() => {})
  return null
}
```

## Pass

```javascript
function useMyCustomHook() { React.useEffect(() => {})) }
function useMyCustomHook() { useEffect(() => {})) }
const useMyCustomHook = () => { React.useEffect(() => {})) }
const useMyCustomHook = () => { useEffect(() => {})) }
function MyComponent() { useMyCustomHook(); return null }
const MyComponent = () => { useMyCustomHook(); return null }
```
