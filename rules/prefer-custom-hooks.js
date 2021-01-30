const { HOOK_PATTERN, REACT_HOOKS } = require('../src/constants')
const { difference } = require('../src/utils')

function getHookParent(node) {
  if (node.type === 'Program') return

  if (node.type === 'FunctionDeclaration') {
    return node
  }

  if (
    node.type === 'VariableDeclarator' &&
    node.init.type === 'ArrowFunctionExpression'
  ) {
    return node
  }

  return getHookParent(node.parent)
}

module.exports = {
  meta: {
    type: 'suggestion',
  },
  create(context) {
    const options = context.options[0] || { allow: [] }
    const allowedHooks = new Set(options.allow)
    const hooksToCheck = difference(REACT_HOOKS, allowedHooks)

    return {
      Identifier(node) {
        if (hooksToCheck.has(node.name)) {
          const hookParent = getHookParent(node)

          if (hookParent && !HOOK_PATTERN.test(hookParent.id.name)) {
            context.report({
              node,
              message:
                'Do not use React Hooks directly in a component. Abstract the functionality into a custom hook and use that instead.',
            })
          }
        }
      },
    }
  },
}
