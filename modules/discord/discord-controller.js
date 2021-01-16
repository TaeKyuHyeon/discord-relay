'use strict'

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
          if (channel !== undefined)
          {
            channel.send(`request received: ${msg}`);
            return msg;
          }

          console.log(`invalid channel : ${channelName}`);
          return 'fail';
        },
      }];
    };
  }
}

module.exports = DiscordController;