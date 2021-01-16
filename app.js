'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

const server = require('./server');
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

//////////////////////////////////////////////////
// process termination signal handler
// & promis unhandledRejection handler 
// for graceful shutdown

const finalize = () => {
  // 1. stop new requset from client
  server.stop();

  // 2. close all data process
  // logger flush.

  // 3. stop process
  process.exit(0);
}

process.on('SIGTERM', () => {
  finalize();
});

process.on('SIGINT', () => {
  finalize();
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  finalize();
});

//////////////////////////////////////////////////

server.start();
