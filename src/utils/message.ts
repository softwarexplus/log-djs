import axios from "axios"

export default function log(client:any, webhook:string) {
    client.on("messageCreate", (message:any) => {
        logMessage(message, "Message Status: send")
    })

    // Log message edit
    client.on("messageUpdate", (oldMessage:any, newMessage:any) => {
        logMessage(newMessage, "Message Status: edit")
    })

    // Log message delete
    client.on("messageDelete", (message:any) => {
        logMessage(message, "Message Status: delete")
    })

    function logMessage(message:any, messageStatus:string) {
        try {
            if (!message.content) return
            const embed = {
                title: `Message from ${message.author.username}`,
                description: message.content,
                color: `5865F2`,
                fields: [
                    {
                        name: `Server`,
                        value: `${message.guild.name} | message.guild.id`,
                    },
                    {
                        name: `Channel`,
                        value: `${message.channel.name} | ${message.channel.id}`,
                    },
                    {
                        name: `Author`,
                        value: `${message.author.username} | ${message.author.id}`,
                    },
                    {
                        name: `Message`,
                        value: `${message.id} | ${messageStatus}`,
                    },
                ],
            }

            try {
                axios.post(webhook, {
                    embeds: [embed],
                })
            } catch (error: unknown) {
                console.error(
                    `[log-djs] FF03: Unable to send webhook \n${error}`
                )
            }
        } catch (error: unknown) {
            console.error(
                `[log-djs] FF04: Unable to create webhook messages \n${error}`
            )
        }
    }
}
