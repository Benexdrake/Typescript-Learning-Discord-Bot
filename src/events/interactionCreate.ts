import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../client/Event";
import { ExtendedInteraction } from "../interfaces/ExtendedInteraction";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non existent command");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});
