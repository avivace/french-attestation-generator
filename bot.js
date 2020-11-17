const { Telegraf } = require('telegraf');
const gen = require('./index');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx =>
    ctx.reply(
        "Welcome! This bot will generate an attestation PDF (Q4 2020) for you!\n\nDisclaimer: this is an unofficial tool, we use a modified version of the software running on the official government website, but we waive any responsibility on the generated PDF. Please always double check them. By using this bot functionalities you acknowledge that the generated PDF are your and only yours responsibility. \n\nPrivacy notice: we don't log any information and the generated PDF are not saved on our machines but directly uploaded to Telegram. Messages and PDF uploaded in this conversation are anyway subject to Telegram terms of service and privacy terms. \n\nIf you agree with this, send /help to see how to use the bot.\n\nThis software is open source and you can easily self host your instance of this bot. You are welcome to send contributions, feedback and bug reports: https://github.com/avivace/french-attestation-generator"
    )
);

bot.help(ctx => {
    ctx.reply(`
    To use the bot, send a JSON string similar to the following one, replacing placeholders with your data.  

    {
    "firstname": "Antuzzo",
    "lastname": "surname",
    "birthday": "01/01/1991",
    "placeofbirth": "Wien",
    "address": "palceholder",
    "city": "placeholder",
    "zipcode": "01234",
    "datesortie": "13/11/2020",
    "heuresortie": "18:11",
    "reasons" : "sport_animaux"
    }
  
    Tap /template to see a message with only this string so you can easily copy-paste it.

    Valid reasons:
        travail
        achats
        sante
        famille
        handicap
        sport_animaux
        convocation
        missions
        enfants
  
    More than one reason:
  
    "reasons" : "sport_animaux, enfants"
  
  
    Commands:
    /start – generates welcome message
    /help – generates this message
    /template – generates a short message with only the JSON as template
    /reasons [reason] – shows English explanation of a given reason. If not given a reason, it will list all valid reasons.
    `);
});

bot.command('reasons', ctx => {
    try {
        const args = ctx.message.text
            .split(' ')
            .slice(1)
            .filter(arg => arg !== '');
        const reasons = [];

        if (!args.length) {
            Object.keys(gen.tableOfReasons).forEach(reason => {
                reasons.push(`${reason}: ${gen.tableOfReasons[reason]}`);
            });
            ctx.reply(reasons.join('\n'));
            return;
        }
        for (const i in args) {
            let arg = args[i];
            if (gen.tableOfReasons.hasOwnProperty(arg.toLowerCase())) {
                reasons.push(`${arg}: ${gen.tableOfReasons[arg]}`);
            }
        }
        ctx.replyWithMarkdown(
            reasons.length
                ? reasons.join('\n')
                : `Invalid reason. Following are valid reasons: ${Object.keys(gen.tableOfReasons).join(', ')}`
        );
    } catch (err) {
        ctx.reply('Error ' + err.message);
    }
});

bot.command('template', ctx => {
    ctx.reply(`{
    "firstname": "name",
    "lastname": "surname",
    "birthday": "01/01/1991",
    "placeofbirth": "Wien, Autriche",
    "address": "placeholder",
    "city": "placeholder",
    "zipcode": "01234",
    "datesortie": "13/11/2020",
    "heuresortie": "18:11",
    "reasons": "travail"
  }`);
});

bot.on('message', ctx => {
    let obj = null;
    let reasons;

    try {
        obj = JSON.parse(ctx.message.text);
        reasons = obj.reasons;
        delete obj.reasons;
        ctx.reply('Looks like your JSON is valid. Generating PDF...');
    } catch (err) {
        console.log(err);
        ctx.reply('JSON Parsing Error:\n' + err.message);
        return;
    }

    pdfBuff = gen.generateAtt(obj, reasons);

    pdfBuff
        .then((result, err) => {
            ctx.replyWithDocument({
                filename: 'attestation.pdf',
                source: result
            });
        })
        .catch(err => {
            ctx.reply('PDF generation error:\n' + err.message);
        });
});

bot.launch();
