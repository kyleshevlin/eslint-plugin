const { REACT_HOOKS } = require('./constants')

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

const HOOK_PATTERN = /^use/

module.exports = {
  meta: {
    type: 'suggestion',
  },
  create(context) {
    return {
      Identifier(node) {
        if (REACT_HOOKS.has(node.name)) {
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
