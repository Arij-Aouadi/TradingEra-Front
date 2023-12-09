// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Ajouter la règle pour le file-loader
  config.module.rules.push({
    test: /\.(jpg|png|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          publicPath: 'images',
        },
      },
    ],
  });

  return config;
};
