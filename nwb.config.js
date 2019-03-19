module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactSelectableSimple',
      externals: {
        react: 'React'
      }
    }
  }
}
