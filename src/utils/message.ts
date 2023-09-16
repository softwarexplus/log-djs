import { Client, ChannelType, Message } from "discord.js"
import axios from "axios"
import Payload from "./../payload"

export default function log(client: Client, webhook: string, ignore?: Array<string>) {
    client.on("messageCreate", (message: Message) => {
        logMessage(message, "Status: Create")
    })

    client.on("messageUpdate", (oldMessage: Message, newMessage: Message) => {
        logMessage(newMessage, "Status: Edit")
    })

    client.on("messageDelete", (message: Message) => {
        logMessage(message, "Status: Delete")
    })

    function logMessage(message: Message, Status: string) {
        let x: string
        let NotAllow: boolean = false

        if (ignore?.length) {
            for (const x of ignore) {
                if (x === message.channelId) {
                    NotAllow = true
                }
            }
        }

        if (message.channel.type === ChannelType.DM || NotAllow) return
        if (message.embeds?.length && message.content) {
            x = `${message.content} \n${JSON.stringify(message.embeds)}`
        } else if (message.embeds?.length && !message.content) {
            x = JSON.stringify(message.embeds)
        } else if (!message.embeds?.length && message.content) {
            x = message.content
        } else {
            return
        }

        try {
            const Payload: Payload = {
                embeds: [
                    {
                        description: x,
                        color: 0x5865f2,
                        fields: [
                            {
                                name: "Author",
                                value: `${message.author.username} | ${message.author.id}`
                            },
                            {
                                name: `Server`,
                                value: `${message.guild.name} | ${message.guild.id}`,
                                inline: true
                            },
                            {
                                name: `Channel`,
                                value: `${message.channel.name} | ${message.channel.id}`
                            },
                            {
                                name: `Author`,
                                value: `${message.author.username} | ${message.author.id}`,
                                inline: true
                            },
                            {
                                name: `Message`,
                                value: `${message.id} | ${Status} | [Go to the message](${message.url}) `
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
