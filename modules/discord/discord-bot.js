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
        msg.reply('Hi');
      }
    });

    this.findChannel = 
      (channelName) => this.channels.cache.find(c => c.name === channelName);

    this.start = () => {
      
      logger.info(`discord login with token: ${token}`);
      this.client.login(token);
    }
  }
}

module.exports = DiscordBot;