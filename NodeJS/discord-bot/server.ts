import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("ready", () => {
  console.log(`The Bot '${client.user?.username}' has logged in.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content.trim().slice(PREFIX.length).split(/\s+/);
    if (CMD_NAME === "kick") {
      const member = message.guild?.members.cache.get(args[0]);
      console.log(member);
      // message.channel.send("User was kicked");
    } else if (CMD_NAME === "ban") {
      message.channel.send("User was banned");
    }
  } else if (message.content === "hello") {
    message.reply("zd dzma");
  }
});
