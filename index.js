const fs = require('fs')
const pdfutil = require('./src/pdf-util')

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

reasons = "sport_animaux"

async function dostuff(){
    try {
      // Don't specify encoding so we get a buffer
      const pdfBase = fs.readFileSync('./src/certificate.pdf')
      console.log("PDF template loaded")
      finalpdf = await pdfutil.generatePdf(profile, reasons, pdfBase)
      // upstream this is done by parcel's file-loader,
      //  thanks crisbal for keeping me sane
      fs.appendFileSync('attestation.pdf', new Buffer.from(finalpdf));
      console.log("PDF generated")
    } catch (err) {
      console.error(err)
    }
}

dostuff()