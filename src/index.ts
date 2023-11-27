import message from "./utils/message.js"
import { Client } from "discord.js"
import { version } from "./../package.json"
import { get } from "axios"

type option = {
    /**
     * Client object
     */
    client: Client
    /**
     * Webhook Token
     */
    webhook: string
    /**
     * Ignore channel id - default (empty)
     */
    ignore?: Array<string>
    /**
     * Message log - default (false)
     */
    message?:
        | boolean
        | {
              /**
               * Message create log - default (false)
               */
              create?: boolean
              /**
               * Message edit log - default (false)
               */
              edit?: boolean
              /**
               * Message delete log - default (false)
               */
              delete?: boolean
          }
    /**
     * Reaction log - default (false)
     */
    reaction?:
        | boolean
        | {
              /**
               * Reaction add log - default (false)
               */
              add?: boolean
              /**
               * Reaction remove log - default (false)
               */
              remove?: boolean
          }
}

export default function config(object: option) {
    get("https://api.github.com/repos/softwarexplus/log-djs/releases/latest")
        .then((res) => {
            if (!res.data.tag_name.includes("beta") && !res.data.tag_name.includes("alpha")) {
                if (version < res.data.tag_name) {
                    console.log(
                        `A new version available --> ${res.data.tag_name}\n` +
                            "see https://github.com/softwarexplus/log-djs/blob/main/CHANGELOG.md for more information"
                    )
                }
            }
        })
        .catch(() => console.log(`Failed to check if package is up to date!`))

    if (!object.client) throw `[log-djs] FF01: client missing`
    if (!object.webhook) throw `[log-djs] FF02: webhook missing`
    if (object.message) {
        message(object.client, object.webhook, object.ignore)
    }
}
