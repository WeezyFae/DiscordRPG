const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'My bot token';

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("!" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRoll(mem, role) {
    if(pluck(mem.roles).includes(role)) {
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
  console.log('John is awake!');
});

  client.on('message', (message) => {
       var args = message.content.split(/[ ]+/);
       if(commandIs('hello_jean', message)) {
        message.channel.sendMessage('Hello there, ' + message.author.username);
          }
          });

//------------------------------------------------------------------------------------------------------

    client.on('message', (message) => {
      var args = message.content.split(/[ ]+/);
      if(commandIs('lore1_jean', message)) {
        message.channel.sendMessage('Welcome young adventurer. Before you head out, you should know something. Would you like to listen to my story? listen_jean or leave_jean');
      }
    });


      client.on('message', (message) => {
        var args = message.content.split(/[ ]+/);
        if(commandIs('listen_jean', message)) {
          message.channel.sendMessage('Thank you for staying and listening to an old man like me.')

          message.channel.sendMessage('There are going to be many troubles along your journey. If you believe and have hope, you can survive these horrors, but do not let them taint you.')
        }
      });


      client.on('message', (message) => {
        var args = message.content.split(/[ ]+/);
        if(commandIs('leave_jean', message)) {
          message.channel.sendMessage('Good-bye then young adventurer. Come back to us safely.')
        }
      });

//------------------------------------------------------------------------------------------------------

    client.on('message', (message) => {
     var args = message.content.split(/[ ]+/);
       if(commandIs('say_jean', message)) {
        array = [ "We in the village have been going through a tough time.", "I hope that these monsters leave our villagers alone soon. We have had it pretty hard lately."];
        var ra = array[Math.floor(Math.random()*array.length)];
        message.channel.sendMessage(ra);
         }
    });

client.login(token);
