const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MzAwMzQ1NTY3OTA3OTM4MzE0.C8rGHw.tWKe6CCFE2ZLqeAJzg3nNpM13cw';
const npc = require('../QuestTest/index.js');
var userHealth = 100;
var monsterHealth = 50;

client.on('ready', () => {
  console.log('QuestTest here for duty')
})

var dialog = [''];
var QuestTest = new npc.quest("QuestTest", dialog);
var prefix = '@';

function pluck(array) {
  return array.map(function(item) { return item["name"] });
}

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith(prefix + str);
}

function reward1(user, channel) {
  user.xp += 20;
  user.gold += 40;
}

  client.on('message', (message) => {
    var args = message.content.split(/[ ]+/);
    if(commandIs('hello quest', message)) {
      message.channel.sendMessage('Hello there, ' + message.author.username);
      message.channel.sendMessage("Are you looking for something to do?");
    }
  });

  client.on('message', (message) => {
    var args = message.content.split(/[ ]+/);
    if(commandIs('questgive', message)) {
      message.channel.sendMessage('I would like you to go out to the fields and kill 5 monsters.')
    }
  });

  client.on('message', (message) => {
    var args = message.content.split(/[ ]+/);
    if(commandIs('endquest 1', message)) {
      if (user.questKill >= 5) {
        message.channel.sendMessage('You have done well! You killed ' + uses.questKill + ' monsters!\n I have an reward for you! You gain 20 xp and 40 gold.')
        reward1();
      }
    }
  });

client.login(token);
