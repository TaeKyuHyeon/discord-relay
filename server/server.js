'use strict';

const Hapi = require('@hapi/hapi');

class Server {

  constructor(host, port) {
    this.controllers = [];

    this.hapiServer = new Hapi.server({
      host: host,
      port: port,      
      routes: {
        validate: {
          options: {
            allowUnknown: true
          }
        },
        state: {
          parse: false,
          failAction: 'ignore'
        },
        cors: {
          origin: ['*'],
          additionalHeaders: [
            'access-control-allow-origin',
            'access-control-allow-headers',
            'origin',
            'x-requested-with',
            'content-type',
            'crowd-token'
          ]
        }
      }
    });

    this.registerController = (controller) => {
      this.controllers.push(controller);
    }

    this.start = async () => {
      try {

        for (const controller of this.controllers) {
          await this.hapiServer.route(controller.routes());
      }

        await this.hapiServer.start();
        // listen info logging
      } catch (e) {
        // error logging
        await this.stop();
      }
    }

    this.stop = async () => {
      await this.hapiServer.stop();
    }
  }
}

module.exports = Server;