function difference(a, b) {
  const result = new Set(a)

  for (const item of b) {
    if (a.has(item)) {
      result.delete(item)
    }
  }

  return result
}

module.exports = {
  difference,
}
