'use strict'

const Logger = require('../logger');
const logger = new Logger(module);

class AdminController {

  constructor() {

    this.routes = () => {
      return [{
        method: 'GET',
        path: '/health',
        handler: async (request, h) => {
          return {
            "status": "UP"
          };
        }
      }];
    }
  }
}

module.exports = AdminController;