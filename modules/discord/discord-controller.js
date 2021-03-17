'use strict'

const Logger = require('../../common/logger');
const logger = new Logger(module);
const Response = require('../../common/util/response');

class DiscordController {

  constructor(bot) {
    this.id = 101; // test
    this.bot = bot;

    this.routes  = () => {
      return [{
        method: 'POST',
        path: '/discord',
        handler: async (request, h) => {
          const res = new Response(this.id, h);

          const channelName = request.payload.channel;
          const requestMsg = request.payload.msg;

          //var channel = this.bot.findChannel(channelName);
          var channel = undefined;
          if (channel === undefined)
          {
            const errMsg = `invalid channel : ${channelName}`;
            logger.error(errMsg);
            return res.fail(500, errMsg); 
          }
          
          await channel.send(`request received: ${requestMsg}`);
          
          const msg = `Send message to (${channel.id})${channel.channelName} success.`;
          logger.debug(requestMsg);
          let r = res.success(requestMsg);
          return r;
        },
      },
      {
        method: 'POST',
        path: '/discord/messages',
        handler: async (request, h) => {
          const res = new Response(this.id, h);

          const channelIds = request.payload.channelIds;
          const requestMsg = request.payload.msg;

          var channels = this.bot.findTextChannelByIds(channelIds);
          if (channels === undefined || channels.length === 0)
          {
            const errMsg = `failed to find channel id: ${channelIds.join()}`;
            logger.error(errMsg);
            return res.fail(500, errMsg);
          }
          
          channels.forEach(async element => {
            await element.send(`request received: ${requestMsg}`);
          });

          const msg = `Send message to channels(${channelIds.join()}) success.`;
          logger.debug(msg);
          return res.success(msg);
        },
      }];
    };
  }
}

module.exports = DiscordController;
