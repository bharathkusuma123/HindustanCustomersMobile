const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add path alias
config.resolver.extraNodeModules = {
  '@': `${__dirname}/src`,
};

module.exports = config;