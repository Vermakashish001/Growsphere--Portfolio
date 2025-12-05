module.exports = {
  hooks: {
    readPackage(pkg) {
      // Force public registry
      return pkg;
    }
  }
}
