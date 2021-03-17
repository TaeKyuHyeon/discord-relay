'use strict';

const Logger = require('../../common/logger');
const logger = new Logger(module);

const Discord = require('discord.js');

class DiscordBot {

  constructor(token) {
    this.client = new Discord.Client();
    this.channels = [];

    this.client.on('ready', () => {
      this.channels = this.client.channels;
    })

    this.client.on('message', async msg => {
      if (msg.content === '@hey') {
        await msg.reply('Hi');
      }

      // for debug
      if (msg.content === '@channel') {
        let channelList = this.client.channels.cache.array();
        await msg.reply(channelList.join());
      }

      if (msg.content === '@server') {
        let serverList = this.client.guilds.cache.array();
        await msg.reply(serverList.join());
      }

      if (msg.content === '@channelId') {
        await msg.reply(msg.channel.id);
      }
    });

    this.findChannel = 
      (channelName) => this.channels.cache.find(c => c.name === channelName);

    this.findTextChannelByIds =
      (channelIds) => this.channels.cache.filter(e => {
        //console.log(`${e} is ${channelIds.includes(Number(e.id))}`);
        if (e.type !== 'text')
        {
          return false;
        }

        return channelIds.includes(Number(e.id));
      });

    this.start = async () => {
      
      logger.info(`discord login with token: ${token}`);
      await this.client.login(token);
    }
  }
}

module.exports = DiscordBot;
