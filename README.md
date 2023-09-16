# Log-DJS

[![GitHub](https://img.shields.io/github/license/discordjs/discord-api-types)](https://github.com/softwarexplus/log-djs/blob/main/LICENSE)
[![Patreon Donate](https://img.shields.io/badge/patreon-donate-brightgreen.svg?label=Donate%20with%20Patreon&logo=patreon&colorB=F96854&link=https://www.patreon.com/SoftwareXPlus)](https://www.patreon.com/SoftwareXPlus)

## Installation

To install log-djs, simply run the following command:

#### For npm:

```console
npm install log-djs
```

#### For yarn:

```console
yarn add log-djs
```

#### For pnpm:

```console
pnpm add log-djs
```

## Usage

This is a simple overview of how to set up this library with all the options.

#### For CommonJS:

```js
// index.js
const { Client, GatewayIntentBits } = require("discord.js")
const { config } = require("log-djs")

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

config({
    client: client, // (Require) Client object - type (Client)
    webhook: "YOUR_WEBHOOK_TOKEN", // (Require) Webhook Token - type (string)
    message: true, // (Optional) Can it log message - type (boolean) - default (false)
    ignore: ["CHANNEL_ID"] // (Optional) Ignore channel id - type (Array<string>) - default (empty)
})

client.login("YOUR_TOKEN_HERE")
```

#### For ECMAScript modules:

```js
// index.js
import { Client, GatewayIntentBits } from "discord.js"
import { config } from "log-djs"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

config({
    client: client, // (Require) Client object - type (Client)
    webhook: "YOUR_WEBHOOK_TOKEN", // (Require) Webhook Token - type (string)
    message: true, // (Optional) Can it log message - type (boolean) - default (false)
    ignore: ["CHANNEL_ID"] // (Optional) Ignore channel id - type (Array<string>) - default (empty)
})

client.login("YOUR_TOKEN_HERE")
```

## Support

---

> If you have any problems or any questions ask us on our [Support Server](https://dsc.gg/SoftwareXPlus)
