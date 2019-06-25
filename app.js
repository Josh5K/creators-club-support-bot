const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

forwards = {
  "565664318062854145":"565665061192859649",
  "565666777971818542":"564656640809500682",
  "565667577003507732":"564663857524768797"
}

client.on("message", message => {
  if(message.author.id == client.user.id) return;

  if(forwards[message.channel.id]) {
    client.channels.get(forwards[message.channel.id]).send(embedMessage(message, `**channel:** ${message.channel} | **user:** ${message.author}\n\n`))
    .then(async (msg) =>  {
      await msg.react('✅');
      msg.react('🛑');
    });
    message.delete();
    message.author.send("We have recived your support request. We will get back to you when we finish our review.");
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if(user.id == client.user.id) return;
  let author = client.users.get(reaction.message.embeds[0].footer.text);

  if(reaction.emoji == "✅") {
    author.send(`${user.username} has accepted the following request!`);
    author.send(new Discord.RichEmbed(reaction.message.embeds[0]));
  }
  else if(reaction.emoji == "🛑") {
    author.send(`${user.username} has declined the following request!`);
    author.send(new Discord.RichEmbed(reaction.message.embeds[0]));
  }
});

client.on('ready', () => {
  client.user.setPresence({
      game: {
          name: 'Created by Creators Club! https://creatorsclub.net/'
      }
  });
});

client.login(config.token);

embedMessage = (message, description = "") => {
  const embed = new Discord.RichEmbed()
  embed.setTitle("Creators Club™");
  embed.setDescription(description + message.content);
  embed.setColor('#36393f');
  embed.setAuthor(message.author.username, message.author.avatarURL);
  embed.setFooter(message.author.id);
  return embed;
}
