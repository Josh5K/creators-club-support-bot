const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

forwards = {
  "565664318062854145":"565665061192859649",
  "565666777971818542":"564656640809500682",
  "565667577003507732":"564663857524768797"
}

client.on("message", async message => {
  if(message.author.id == client.user.id) return;

  if(forwards[message.channel.id]) {
    client.channels.get(forwards[message.channel.id]).send(embedMessage(message))
    .then((msg) =>  {
      msg.react('✅');
      msg.react('🛑');
    });
    message.delete();
    message.author.send("We have recived your support request. We will get back to you when we finish our review.");
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if(user.id == client.user.id) return;
  let author = client.users.get(reaction.message.embeds[0].title);

  if(reaction.emoji == "✅") {
    author.send(`${user.username} has accepted the following request!`);
  }
  else if(reaction.emoji == "🛑") {
    author.send(`${user.username} has declined the following request!`);
  }
  author.send(`\`\`\`${reaction.message.embeds[0].description}\`\`\``);
});

client.login(config.token);

embedMessage = (message) => {
  const embed = new Discord.RichEmbed()
  embed.setTitle(message.author.id);
  embed.setDescription(message.content);
  embed.setColor('#36393f');
  embed.setAuthor(message.author.username, message.author.avatarURL);
  embed.setFooter("Copyright 2019 | Creators Club");
  return embed;
}
