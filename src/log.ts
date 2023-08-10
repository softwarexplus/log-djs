import message from "./utils/message.js"

type option = {
    client: any
    webhook: string
    message?: boolean
}

export default function config(object: option) {
    if (!object.client) throw `[log-djs] FF01: client missing`
    if (!object.webhook) throw `[log-djs] FF02: webhook missing`
    if (object.message) {
        message(object.client, object.webhook)
    }
}
