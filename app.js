'use strict';

const Hapi = require('@hapi/hapi');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');
let channel;

client.on('ready', () => {
  // temporary initialize
  channel = client.channels.cache.find(channel => channel.name === '일반');
  // channel.send("Hello there!"); 
});

// all server message parsing.
client.on('message', async msg => {
  if (msg.content === '@hey') {
    msg.reply('Hi');
  }
});

client.login(config.discord.id);

const init = async () => {
  
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  
  server.route({
    method: 'POST',
    path: '/msg',
    handler: (request, h) => {
      console.log(`${request.payload.msg}`);
      let requestChannelName = request.payload.channel;
      let requestMsessage = request.payload.msg;

      if (channel.name !== requestChannelName)
      {
        console.log(`invalid channel name ${requestChannelName}`);
        return `fail`;
      }

      channel.send(`request received: ${request.payload.msg}`);
      return `${request.payload.msg}`;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();