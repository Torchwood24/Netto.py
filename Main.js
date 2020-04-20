import discord
import datetime

from discord import Guild
from discord.utils import get
import asyncio

client = discord.Client()

@client.event
async def on_ready():
    print("Eingeloggt")
    client.loop.create_task(status_task())


def is_not_pinned(mess):
    return not mess.pinned

async def status_task():
    while True:
        await client.change_presence(activity=discord.Game("IG: Fressbergen"), status=discord.Status.online)
        await asyncio.sleep(5)
        await client.change_presence(activity=discord.Game("Bald neue Reviews"), status=discord.Status.online)
        await asyncio.sleep(5)

@client.event
async def on_message(message):
    if message.author.bot:
        return
    if "Nhelp" in message.content:
        await message.author.send('**__Commandliste für den NettoBot__**\r\n'
                                  '**Genereller Trigger = N**\r\n'
                                  '\r\n'
                                   '__Standard Commands__\r\n'
                                   '↳Nhelp - Sends you this list\r\n'
                                   '↳Nhelp - Sends you this list in German\r\r
                                   '↳Nperso + Name - Shows Userinfo\r\n'
                                   '↳Nroulette + Einsatz - **IM ON THAT**\r\n'
                                   '    ↳NRhelp - Brief Help\r\n'
                                   'Nguess - Guess a number between 1 and 10\r\n'
                                   '\r\n'
                                   '__Comming soon__\r\n'
                                   'Levelsytem\r\n'
                                   'NettoStory - A multiple choice story Game\r\n'
                                   '\r\n'
                                   '__Seasonale Commands - (ON/**OFF**)__\r\n'
                                   '$wichteln - Give some random dude a present\r\n'
                                   '                         and get one too\r\n'
                                   '\r\n'
                                   '__Mod Commands__\r\n'
                                   '**Trigger for Mod Commands = NM**\r\n'
                                   '\r\n'
                                   '↳NMclear *** - Purges xx messages\r\n'
                                   '↳NMkick @User - Kick someone\r\n'
                                   '↳NMban @User - Ban someone ')


    if message.content.startswith("Nuser"):
        args = message.content.split(" ")
        if len(args) == 2:
            member: Member = discord.utils.find(lambda m: args[1] in m.name, message.guild.members)
            if member:
                embed = discord.Embed(title="Personalausweis von/Userinfo from {}".format(member.name),
                                      description="Userinfo for {}".format(
                                          member.mention),
                                      color=0x22a7f0)
                embed.add_field(name="Dem Server beigetreten am/\r\n"
                                     "Server joined at", value=member.joined_at.strftime("%d/%m/%Y, %H:%M:%S"),
                                inline=True)
                embed.add_field(name="Geboren am\r\n"
                                     "Born at", value=member.created_at.strftime("%d/%m/%Y, %H:%M:%S"),
                                inline=True)
                rollen = ""
                for role in member.roles:
                    if not role.is_default():
                        rollen += "{} \r\n".format(role.mention)
                if rollen:
                    embed.add_field(name="Berufungen/\r\n"
                                         "Jobs", value=rollen, inline=True)
                embed.set_thumbnail(url=member.avatar_url)
                embed.set_footer(text="NETTOBOT USERINFO")
                await message.channel.send(embed=embed)

"COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS - COMMANDS"

client.run("INPUT YOUR TOKEN HERE")
