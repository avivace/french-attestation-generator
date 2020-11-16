## *Attestation de déplacement dérogatoire* telegram bot

A bot to generate Attestation de déplacement dérogatoire documents on the go, just by sending a telegram message.

**Work In Progress Notice**: the bot UX is still raw and unforgiving. It expects a well formatted JSON stringified object and will break on syntax errors or missing keys.

Install dependencies and run the Telegram bot:

```bash
npm install
BOT_TOKEN=YOUR_BOT_TOKEN_HERE node bot.js
```

You can get a bot token talking with @BotFather on Telegram.

Open the conversation with the bot and send a JSON string in this form:

```javascript
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
```

A PDF will be uploaded for you.

Be careful for syntax errors and remember to include the `reasons` key, too. Reasons can be `travail, achats, sante, famille, handicap, sport_animaux, convocation, missions, enfants`. If you want to select more than one reason, separate them with a comma. E.g. `"reasons" : "sport_animaux, enfants"`



### attgen.js

**attgen.js** is a modified version of the official *Attestation de déplacement dérogatoire generator* web application from Ministère de l'intérieur français, in order to be run headlessly. It is used by the telegram bot to generate the PDF, but you can import it in any javascript/node application:

```javascript
// Import attgen.js
const attgen = require('./att-gen')

// Dummy profile data
profile = {
  "firstname": "name",
  "lastname": "surname",
  "birthday": "01/01/1991",
  "placeofbirth": "Wien",
  "address": "palceholder",
  "city": "placeholder",
  "zipcode": "01234",
  "datesortie": "13/11/2020",
  "heuresortie": "18:11",
}

// Reason(s)
reasons = "sport_animaux"

// Get the attestation PDF with the given data as a Buffer
attpdf = attgen.generateAtt(obj, reasons)

// Write PDF to disk
fs.appendFileSync('attestation.pdf', new Buffer.from(attpdf));

```



### Acknowledgements

Based on: https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020, https://media.interieur.gouv.fr/deplacement-covid-19/
