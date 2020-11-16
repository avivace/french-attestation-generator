const { Telegraf } = require('telegraf')
const gen = require('./index')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome. Source code: https://github.com/avivace/french-attestation-generator'))

bot.help((ctx)=>{
    ctx.reply(`Valid reasons:
  travail
  achats
  sante
  famille
  handicap
  sport_animaux
  convocation
  missions
  enfants

  Example JSON:

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


  More than one reason:

  "reasons" : "sport_animaux, enfants"

  `)
})

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