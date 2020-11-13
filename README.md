## Headless *Attestation de déplacement dérogatoire* generator

Modified version of the official *Attestation de déplacement dérogatoire generator* web application from Ministère de l'intérieur français, in order to be run headlessly.

Get ready:

```bash
npm install
```

Edit your `profile` data and `reasons` (comma-separated) in `index.js` and run `node main.js`.
Your generated attestation will be in `attestation.pdf`.

Based on: https://github.com/LAB-MI/attestation-deplacement-derogatoire-q4-2020, https://media.interieur.gouv.fr/deplacement-covid-19/
