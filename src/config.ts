import message from "./utils/message.js"
import { Client } from "discord.js"
import { version } from "./../package.json"
import { get } from "axios"
type option = {
    client: Client
    webhook: string
    message?: boolean
}

export function config(object: option) {
    get("https://api.github.com/repos/softwarexplus/log-djs/releases/latest")
        .then((res) => {
            if (res.data.tag_name !== version) {
                console.log(
                    `Your bot is not up to date! Please update to the latest version!`,
                    version + " -> " + res.data.tag_name
                )
            }
        })
        .catch((err) => {
            console.log(`Failed to check if bot is up to date!`)
        })

    if (!object.client) throw `[log-djs] FF01: client missing`
    if (!object.webhook) throw `[log-djs] FF02: webhook missing`
    if (object.message) {
        message(object.client, object.webhook)
    }
}
