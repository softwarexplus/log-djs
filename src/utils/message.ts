import { Client, ChannelType, Message } from "discord.js"
import axios from "axios"
import Payload from "./../payload"

export default function log(client: Client, webhook: string) {
    client.on("messageCreate", (message: Message) => {
        logMessage(message, "Status: Create")
    })

    client.on("messageUpdate", (oldMessage: Message, newMessage: Message) => {
        logMessage(newMessage, "Status: Edit")
    })

    client.on("messageDelete", (message: Message) => {
        logMessage(message, "Status: Delete")
    })

    function logMessage(message: Message, messageStatus: string) {
        if (message.channel.type === ChannelType.DM || message.embeds?.length || !message.content) return

        try {
            const Payload: Payload = {
                embeds: [
                    {
                        title: `Message from ${message.author.username}`,
                        description: message.content,
                        color: 0x5865f2,
                        fields: [
                            {
                                name: `Server`,
                                value: `${message.guild.name} | ${message.guild.id}`
                            },
                            {
                                name: `Channel`,
                                value: `${message.channel.name} | ${message.channel.id}`
                            },
                            {
                                name: `Author`,
                                value: `${message.author.username} | ${message.author.id}`
                            },
                            {
                                name: `Message`,
                                value: `${message.id} | ${messageStatus}`
                            }
                        ]
                    }
                ]
            }

            try {
                axios.post(webhook, Payload)
            } catch (error: unknown) {
                console.error(`[log-djs] FF03: Unable to send webhook \n${error}`)
            }
        } catch (error: unknown) {
            console.error(`[log-djs] FF04: Unable to create webhook messages \n${error}`)
        }
    }
}
