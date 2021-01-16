'use strict';

const DiscordBot = require('./modules/discord').DiscordBot;
const DiscordController = require('./modules/discord').DiscordController;

const config = require('./config');
const server = require('./server');
const discordBot = new DiscordBot(config.discord.id);
const discordController = new DiscordController(discordBot);

discordBot.start();

server.registerController(discordController);

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
