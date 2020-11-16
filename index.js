const fs = require('fs')
const pdfutil = require('./src/pdf-util')

profile = {
    "firstname": "name",
    "lastname": "surname",
    "birthday": "01/01/1991",
    "placeofbirth": "Wien, Autriche",
    "address": "placeholder",
    "city": "placeholder",
    "zipcode": "01234",
    "datesortie": "13/11/2020",
    "heuresortie": "18:11",
}

exports.tableOfReasons = {
    travail: "Commuting to and from work or university and training places; business trips that cannot be delayed.",
    achats: "Running necessary errands to purchase items for professional activity, or basic commodities  available in the businesses allowed to provide service, order withdrawal or home deliveries.",
    sante: "Consults and provision of care that cannot be done remotely; medication purchase.",
    famille: "Imperative family reasons, assisting vulnerable persons, persons in a precarious situation or taking care of children.",
    handicap: "Persons with a disability and their accompanying person.",
    sport_animaux: "Individual outdoor exercise (collective physical activity is not allowed), walking out with only the people living in the same household or walking out a pet, within 1km of one’s place of residence and for one hour.",
    convocation: "Judicial or administrative summons; appointment to public service offices.",
    missions: "Participating in a mission of general interest upon request from an administrative authority.",
    enfants: "Taking children to and picking them up from school or after-school activity."
}

reasons = "sport_animaux"

async function generateAtt(profile, reasons){

    // Don't specify encoding so we get a buffer
    const pdfBase = fs.readFileSync('./src/certificate.pdf')
    console.log("PDF template loaded")
    finalpdf = await pdfutil.generatePdf(profile, reasons, pdfBase)
    // upstream this is done by parcel's "implicit" file-loader,
    //  thanks crisbal for keeping me sane
    await fs.appendFileSync('attestation.pdf', new Buffer.from(finalpdf));
    console.log("PDF generated")
    return new Buffer.from(finalpdf)

}

exports.generateAtt = generateAtt

//console.log(generateAtt())