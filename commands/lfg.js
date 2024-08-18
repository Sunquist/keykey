const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, Events, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ThreadAutoArchiveDuration, ChannelType  } = require('discord.js');

const commandConfig = {
  command: "lfg",
  commandAlts: [],
  description: "Creates a new LFG thread",
  help: "lfg :rank :location",
}

const ranks = [
    {
        name: "ASCENDANT 1",
        category: "ASCENDANT",
        icon: "https://static.wikia.nocookie.net/valorant/images/e/e5/Ascendant_1_Rank.png/revision/latest?cb=20220616175506"
    },
    {
        name: "ASCENDANT 2",
        category: "ASCENDANT",
        icon: "https://static.wikia.nocookie.net/valorant/images/1/1e/Ascendant_2_Rank.png/revision/latest?cb=20220616175514"
    },
    {
        name: "ASCENDANT 3",
        category: "ASCENDANT",
        icon: "https://static.wikia.nocookie.net/valorant/images/5/53/Ascendant_3_Rank.png/revision/latest?cb=20220616175519"
    },
    {
        name: "BRONZE 1",
        category: "BRONZE",
        icon: "https://static.wikia.nocookie.net/valorant/images/b/bd/Bronze_1_Rank.png/revision/latest?cb=20200623203119"
    },
    {
        name: "BRONZE 2",
        category: "BRONZE",
        icon: "https://static.wikia.nocookie.net/valorant/images/c/c7/Bronze_2_Rank.png/revision/latest?cb=20200623203140"
    },
    {
        name: "BRONZE 3",
        category: "BRONZE",
        icon: "https://static.wikia.nocookie.net/valorant/images/a/ae/Bronze_3_Rank.png/revision/latest?cb=20200623203313"
    },
    {
        name: "DIAMOND 1",
        category: "DIAMOND",
        icon: "https://static.wikia.nocookie.net/valorant/images/a/ae/Diamond_1_Rank.png/revision/latest?cb=20200623203609"
    },
    {
        name: "DIAMOND 2",
        category: "DIAMOND",
        icon: "https://static.wikia.nocookie.net/valorant/images/6/6a/Diamond_2_Rank.png/revision/latest?cb=20200623203610"
    },
    {
        name: "DIAMOND 3",
        category: "DIAMOND",
        icon: "https://static.wikia.nocookie.net/valorant/images/0/01/Diamond_3_Rank.png/revision/latest?cb=20200623203611"
    },
    {
        name: "GOLD 1",
        category: "GOLD",
        icon: "https://static.wikia.nocookie.net/valorant/images/6/65/Gold_1_Rank.png/revision/latest?cb=20200623203413"
    },
    {
        name: "GOLD 2",
        category: "GOLD",
        icon: "https://static.wikia.nocookie.net/valorant/images/0/02/Gold_2_Rank.png/revision/latest?cb=20200623203415"
    },
    {
        name: "GOLD 3",
        category: "GOLD",
        icon: "https://static.wikia.nocookie.net/valorant/images/2/27/Gold_3_Rank.png/revision/latest?cb=20200623203417"
    },
    {
        name: "IMMORTAL 1",
        category: "IMMORTAL",
        icon: "https://static.wikia.nocookie.net/valorant/images/a/a8/Immortal_1_Rank.png/revision/latest?cb=20200623203613"
    },
    {
        name: "IMMORTAL 2",
        category: "IMMORTAL",
        icon: "https://static.wikia.nocookie.net/valorant/images/2/21/Immortal_2_Rank.png/revision/latest?cb=20200623203615"
    },
    {
        name: "IMMORTAL 3",
        category: "IMMORTAL",
        icon: "https://static.wikia.nocookie.net/valorant/images/0/0b/Immortal_3_Rank.png/revision/latest?cb=20200623203617"
    },
    {
        name: "IRON 1",
        category: "IRON",
        icon: "https://static.wikia.nocookie.net/valorant/images/7/7c/Iron_1_Rank.png/revision/latest?cb=20200623203005"
    },
    {
        name: "IRON 2",
        category: "IRON",
        icon: "https://static.wikia.nocookie.net/valorant/images/b/bf/Iron_2_Rank.png/revision/latest?cb=20200623203053"
    },
    {
        name: "IRON 3",
        category: "IRON",
        icon: "https://static.wikia.nocookie.net/valorant/images/7/79/Iron_3_Rank.png/revision/latest?cb=20200623203101"
    },
    {
        name: "PLATINUM 1",
        category: "PLATINUM",
        icon: "https://static.wikia.nocookie.net/valorant/images/9/96/Platinum_1_Rank.png/revision/latest?cb=20200623203419"
    },
    {
        name: "PLATINUM 2",
        category: "PLATINUM",
        icon: "https://static.wikia.nocookie.net/valorant/images/5/5a/Platinum_2_Rank.png/revision/latest?cb=20200623203606"
    },
    {
        name: "PLATINUM 3",
        category: "PLATINUM",
        icon: "https://static.wikia.nocookie.net/valorant/images/1/1b/Platinum_3_Rank.png/revision/latest?cb=20200623203607"
    },
    {
        name: "RADIANT",
        category: "RADIANT",
        icon: "https://static.wikia.nocookie.net/valorant/images/1/1a/Radiant_Rank.png/revision/latest?cb=20200623203621"
    },
    {
        name: "SILVER 1",
        category: "SILVER",
        icon: "https://static.wikia.nocookie.net/valorant/images/8/8a/Silver_1_Rank.png/revision/latest?cb=20200623203408"
    },
    {
        name: "SILVER 2",
        category: "SILVER",
        icon: "https://static.wikia.nocookie.net/valorant/images/e/e9/Silver_2_Rank.png/revision/latest?cb=20200623203410"
    },
    {
        name: "SILVER 3",
        category: "SILVER",
        icon: "https://static.wikia.nocookie.net/valorant/images/d/d7/Silver_3_Rank.png/revision/latest?cb=20200623203413"
    },
]

const regions = [
    {
        name: "EU",
        category: "EU",
        icon: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/eu.png"
    },
    {
        name: "NA",
        category: "NA",
        icon: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/us.png"
    },
    {
        name: "LATAM",
        category: "LATAM",
        icon: null
    },
    {
        name: "BR",
        category: "BR",
        icon: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/br.png"
    },
    {
        name: "KR",
        category: "KR",
        icon: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/kr.png"
    },
    {
        name: "AP",
        category: "AP",
        icon: null
    },
]

const processInteraction = async (client, interaction) => {
    try {  

        const modal = new ModalBuilder()
			.setCustomId('lfg')
			.setTitle('Looking For Group');

        // Create the text input components
		const rankInput = new TextInputBuilder()
            .setCustomId('rank')
            .setLabel("What's your current rank?")
            .setPlaceholder("Gold 3")
            .setStyle(TextInputStyle.Short);

        const regionInput = new TextInputBuilder()
            .setCustomId('region')
            .setLabel("What's your región?")
            .setPlaceholder("EU | NA | BR | LATAM | KR | AP")
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("OPTIONAL: Additional information")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);;

        const firstActionRow = new ActionRowBuilder().addComponents(rankInput);
		const secondActionRow = new ActionRowBuilder().addComponents(regionInput);
		const thirdRow = new ActionRowBuilder().addComponents(descriptionInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdRow);

        await interaction.showModal(modal);
    }catch(Ex){
      console.log(Ex);
  
      client.error(`(COMMAND_LFG): ${Ex.message || "Unknown exception"}`)
  
      if(Ex.message)
        return await interaction.reply(Ex.message);  
  
      return await interaction.reply("Unknown exception"); 
    }
}
  
const processModal = async (client, interaction) => {
    try {  
        if (!interaction.isModalSubmit()) return;
        console.log(interaction);

        const rank = interaction.fields.getTextInputValue('rank');
	    const region = interaction.fields.getTextInputValue('region');
	    const description = interaction.fields.getTextInputValue('description');
        const threadName = `lfg-${region}-${interaction.user.username}-${Date.now()}`

        const rankObj = ranks.find((r) => r.name.replaceAll(" ", "") === rank.replaceAll(" ", "").toUpperCase())
        const rankIcon = (rankObj)? rankObj.icon : "https://static.wikia.nocookie.net/valorant/images/b/b2/TX_CompetitiveTier_Large_0.png/revision/latest?cb=20200623203757"

        const regionObj = regions.find((r) => r.name === region.toUpperCase())
        const regionIcon = (regionObj && regionObj.icon)? regionObj.icon : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRiF21ZUAcxU1ZHXGOpmOoGqH7a5F0xxCWmg&s"

        const existingThread = interaction.channel.threads.cache.find(x => x.name === threadName);

        if(existingThread){
            await existingThread.delete();
            return;
        }

        const embedMessage = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: `${region}`, iconURL: regionIcon })
            .setThumbnail(rankIcon)
            .setDescription((description)? `${interaction.user.username}: ${description}` : `${interaction.user.username} is looking for a ${rankObj.category || rank} duo`)
            .addFields(
                { name: 'Rank', value: rank, inline: true },
                { name: "Region", value: region, inline: true },
            )
            .setTimestamp();

        const joinButton = new ButtonBuilder()
			.setCustomId(threadName)
			.setLabel('Join')
			.setStyle(ButtonStyle.Success);

        const newButton = new ButtonBuilder()
            .setCustomId("lfg-new")
            .setLabel('Create your own party')
            .setStyle(ButtonStyle.Primary);

        const actionRow = new ActionRowBuilder()
			.addComponents(joinButton, newButton);
        
        await interaction.reply({ embeds: [embedMessage], components: [actionRow] });

        const thread = await interaction.channel.threads.create({
            name: threadName,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
            type: ChannelType.PrivateThread,
            reason: `${interaction.user.username} is looking for a group`,
        });

        await thread.members.add(interaction.user.id);
        
        console.log(`Created thread: ${thread.name}`);
    }catch(Ex){
      console.log(Ex);
  
      client.error(`(COMMAND_LFG): ${Ex.message || "Unknown exception"}`)
  
      if(Ex.message)
        return await interaction.reply(Ex.message);  
  
      return await interaction.reply("Unknown exception"); 
    }
}

const processButton = async (client, interaction) => {
    
    try {  
        if(interaction.customId === "lfg-new"){
            processInteraction(client, interaction)
            return;
        }

        const existingThread = interaction.channel.threads.cache.find(x => x.name === interaction.customId);

        if(!existingThread){
            await interaction.reply({ content: 'Group has been disbanded!', ephemeral: true });
            return;
        }

        await existingThread.members.add(interaction.user.id);
        await interaction.reply({ content: 'You have been added to the group!', ephemeral: true });

    }catch(Ex){
        console.log(Ex);
    
        client.error(`(COMMAND_LFG): ${Ex.message || "Unknown exception"}`)
    
        if(Ex.message)
          return await interaction.reply(Ex.message);  
    
        return await interaction.reply("Unknown exception"); 
      }
}

module.exports = {
    commandConfig,
    chat: async (client, message) => {
      return await message.reply("Not used");
    },
      data: new SlashCommandBuilder()
          .setName(commandConfig.command)
          .setDescription(commandConfig.description)
    ,async execute(client, interaction) {
        return processInteraction(client, interaction)
    }
    ,async modalResponse(client, interaction) {
        return processModal(client, interaction)
    }
    ,async buttonResponse(client, interaction) {
        return processButton(client, interaction)
    },
  };
  