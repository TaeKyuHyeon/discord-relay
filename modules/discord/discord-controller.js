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
          
          await channel.send(`request received: ${msg}`);
          return msg;
        },
      },
      {
        method: 'POST',
        path: '/discord/messages',
        handler: async (request, h) => {
          const channelIds = request.payload.channelIds;
          const msg = request.payload.msg;

          var channels = this.bot.findTextChannelByIds(channelIds);
          if (channels === undefined || channels.length === 0)
          {
            logger.error(`failed to find channel id: ${channelIds.join()}`);
            return 'fail';
          }
          
          channels.forEach(async element => {
            await element.send(`request received: ${msg}`);
          });
          return msg;
        },
      }];
    };
  }
}

module.exports = DiscordController;
