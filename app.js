const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');

// all server message parsing.
client.on('message', async msg => {
  if (msg.content === '@hey') {
    msg.reply('Hi');
  }
});

client.login(config.discord.id);
