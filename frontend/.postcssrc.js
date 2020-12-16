module.exports = {
  modules: true,
  plugins: {
    autoprefixer: true,
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:3]',
    },
  },
};