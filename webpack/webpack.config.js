const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => {
  const { env } = envVars;
  const environmentConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, environmentConfig);
  return config;
};
