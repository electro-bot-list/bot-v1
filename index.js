client.on ('message', async (Message) => {
  var Command = Message.content.slice (prefix.length).split (' ')[0],
      User = Message.mentions.users.first ();
  if (!User && Message.content.split (' ')[1]) User = await Client.fetchUser (Message.content.split (' ')[1]).catch (() => false);
  switch (Command) {
    case "botinfo":
      if (!User || !User.bot) return Message.channel.send ('لازم تمنشن بوت');
      var DATA = await (require ('edbl.js')).getBot (User.id),
          Owner = DATA.owner ? await Client.fetchUser (DATA.owner.id) : false;
      if (DATA['error'] && DATA['error'].code == 69) return Message.channel.send ('اظن هذا البوت مو موجود بالموقع؟');
      else Message.channel.send (`edbl.xyz/view/${DATA.id}`, new (require ('discord.js')).RichEmbed ()
                                .setColor ('#7289DA')
                                .setAuthor ('Some info about ' + DATA.username, DATA.avatarURL)
                                .setThumbnail (DATA.avatarURL)
                                .setDescription (`**${DATA.shortdesc}**`)
                                .setFooter ('@Gaber', Client.user.displayAvatarURL)
                                .addField ('Another', `>>> Library: **${DATA.lib}**\nVotes: **${DATA.votes}**\nPrefix: **${DATA.prefix}**`, true)
                                .addField ('Owner', `[${Owner.tag}](edbl.xyz/prfoile/${Owner.id})`, true)
                                .addField ('Tags', `>>> **${DATA.tags.map (Tag => Tag).join ('\n')}**`, true)
                                );
      break;
    case "userinfo":
      break;
  }
});
