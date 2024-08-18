module.exports = {
	name: 'interactionCreate',
	async execute(args) {
		const [client, interaction] = args;

		if(interaction.isModalSubmit()){
			const command = client.commands.get(interaction.customId);

			if (!command || !command.modalResponse) {
				console.log("No handler for command", command)
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				return;
			}
	
			try {
				await command.modalResponse(client, interaction);
			} catch (error) {
				client.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

		if(interaction.isCommand()){
			const command = client.commands.get(interaction.commandName);

			if (!command) {
				console.log("No handler for command", command)
				return;
			}
	
			try {
				await command.execute(client, interaction);
			} catch (error) {
				client.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

		if(interaction.isButton()){
			const command = client.commands.get(interaction.customId.split("-")[0]);
			if (!command || !command.buttonResponse) {
				console.log(interaction)
				console.log("No handler for command", command)
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				return;
			}

			try {
				await command.buttonResponse(client, interaction);
			} catch (error) {
				client.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
