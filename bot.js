const { Telegraf } = require('telegraf')
const gen = require('./index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('message', (ctx) => {
    obj = null

    console.log(ctx.message.text)
    try {
        var obj = JSON.parse(ctx.message.text)
        var reasons = obj.reasons
        delete obj.reasons
        ctx.reply('Looks like your JSON is valid. Generating PDF..')
    } catch (err) {
        console.log(err)
        ctx.reply('JSON Parsing Error:\n' + err.message)
        return
    }


    pdfBuff = gen.generateAtt(obj, reasons)

    pdfBuff.then(function(result, err) {
        console.log(result, err)
        ctx.replyWithDocument({
            filename: 'attestation.pdf',
            source: result
        })

    }).catch((err) => {
        ctx.reply('PDF generation error:\n'+err.message)
    })


})

bot.launch()