const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'Mjk3MDA3MjIxMjM2MzAxODI1.C76hFA.s9twJqWFlW7n3GZBu82_Tps-cEc';

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
         const helloJean = new Discord.RichEmbed()
         .setTitle("Hello")
         .setAuthor("Jean", message.author.avatarURL)

         .setColor(0x00AE86)
         .addField("Hello there, ",  message.author.username)
         message.channel.sendEmbed(helloJean);
          }
          });

//------------------------------------------------------------------------------------------------------

    client.on('message', (message) => {
      var args = message.content.split(/[ ]+/);
      if(commandIs('lore1_jean', message)) {
        const lore1Jean = new Discord.RichEmbed()
        .setTitle("Lore")
        .setAuthor("Jean", message.author.avatarURL)

        .setColor(0x00AE86)
        .addField("Welcome young adventurer. Before you head out, you should know something. Would you like to listen to my story?")
        .addField("listen_jean")
        .addField("leave_jean")
        message.channel.sendEmbed(lore1Jean);
      }
    });


      client.on('message', (message) => {
        var args = message.content.split(/[ ]+/);
        if(commandIs('listen_jean', message)) {
          const listJean = new Discord.RichEmbed()
          .setTitle("Listen")
          .setAuthor("Jean", message.author.avatarURL)

          .setColor(0x00AE86)
          .addField("Thank you for staying and listening to an old man like me.")
          .addField("There are going to be many troubles along your journey. If you believe and have hope, you can survive these horrors, but do not let them taint you.")
          message.channel.sendEmbed(listJean);
        }
      });


      client.on('message', (message) => {
        var args = message.content.split(/[ ]+/);
        if(commandIs('leave_jean', message)) {
          const leafJean = new Discord.RichEmbed()
          .setTitle("Leave")
          .setAuthor("Jean", message.author.avatarURL)

          .setColor(0x00AE86)
          .addField("Good-bye then young adventurer. Come back to us safely.")
          message.channel.sendEmbed(leafJean);
        }
      });

//------------------------------------------------------------------------------------------------------

    client.on('message', (message) => {
     var args = message.content.split(/[ ]+/);
       if(commandIs('say_jean', message)) {
        array = [ "We in the village have been going through a tough time.", "I hope that these monsters leave our villagers alone soon. We have had it pretty hard lately."];
        var ra = array[Math.floor(Math.random()*array.length)];
        const sayJean = new Discord.RichEmbed()
        .setTitle("Say")
        .setAuthor("Jean", message.author.avatarURL)

        .setColor(0x00AE86)
        .addField(ra)
        message.channel.sendEmbed(sayJean);
         }
    });

client.login(token);
