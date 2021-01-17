'use strict'

const Logger = require('../../common/logger');
const logger = new Logger(module);

class DiscordController {

  constructor(bot) {
    this.bot = bot;

    this.routes  = () => {
      return [{
        method: 'POST',
        path: '/discord',
        handler: async (request, h) => {
          const channelName = request.payload.channel;
          const msg = request.payload.msg;

          var channel = this.bot.findChannel(channelName);
          if (channel === undefined)
          {
            logger.error(`invalid channel : ${channelName}`);
            return 'fail';
          }
          
          channel.send(`request received: ${msg}`);
          return msg;
        },
      }];
    };
  }
}

module.exports = DiscordController;