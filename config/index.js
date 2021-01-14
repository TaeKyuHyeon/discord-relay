'use strict';

const environment = process.env.NODE_ENV || 'dev';
const fs = require('fs');

let configPath;
if (fs.existsSync(`${__dirname}/${environment}.config.js`)) {
  configPath = `${__dirname}/${environment}.config`;
} else {
  configPath = `${__dirname}/${environment}.config.default`;
}
const config = require(configPath);
const packageJson = require('../package.json');

console.info('=====================================');
console.info(`Application version: ${packageJson.version}`);
console.info(`${configPath} will be used`);
console.info('=====================================');
console.log(`config: ${JSON.stringify(config)}`);

module.exports = config;
