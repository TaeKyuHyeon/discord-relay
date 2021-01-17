'use strict';


const Logger = require('./common/logger');
const logger = new Logger(module);

const DiscordBot = require('./modules/discord').DiscordBot;
const DiscordController = require('./modules/discord').DiscordController;

const config = require('./config');
const server = require('./server');
const discordBot = new DiscordBot(config.discord.id);
const discordController = new DiscordController(discordBot);

logger.info(`Application Start`);

discordBot.start();

server.registerController(discordController);

//////////////////////////////////////////////////
// process termination signal handler
// & promis unhandledRejection handler 
// for graceful shutdown

const finalize = async () => {
  
  logger.info(`Finalize start`);
  
  // 1. stop new requset from client
  server.stop();

  // 2. close all data process
  
  logger.info(`logger flush start.`);
  logger.on('finish', function() {
    process.exit(0)
  })

  //Should display END before exiting the process according to doc
  logger.info('logger flush END');
  logger.end();

  // 3. stop process
  //process.exit(0);
}

process.on('SIGTERM', () => {
  finalize();
});

process.on('SIGINT', () => {
  finalize();
});

process.on('unhandledRejection', (err) => {
  logger.error(`unhandeled rejection occured, ${err}`);
  finalize();
});

process.on('uncaughtException', (err) => {
  finalize();
});

//////////////////////////////////////////////////

server.start();