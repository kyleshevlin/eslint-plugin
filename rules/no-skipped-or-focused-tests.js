const FUNCTION_NAMES = ['fdescribe', 'fit', 'xdescribe', 'xit', 'xtest']
const OBJECT_NAMES = ['describe', 'it', 'test']
const METHOD_NAMES = ['only', 'skip']

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      recommended: 'error',
      description: 'Prevent the skipping or focusing of tests',
    },
  },
  create: function (context) {
    return {
      CallExpression(node) {
        const { name } = node.callee

        if (FUNCTION_NAMES.includes(name)) {
          context.report(node, `Do not use "${name}".`)
        }
      },
      MemberExpression(node) {
        const { object, property } = node

        if (
          OBJECT_NAMES.includes(object.name) &&
          METHOD_NAMES.includes(property.name)
        ) {
          context.report(node, `Do not use "${object.name}.${property.name}".`)
        }
      },
    }
  },
}
