const fs = require('fs')

const base = "/Users/bertillemenguy/M1/S8/projet/V1/back" 
const port_http = 4000

const private_key = "zjerYhe+7V"


if (!fs.existsSync(base)) {
    console.log("Erreur chargement config.js")
    console.log("Le dossier "+base+" n'existe pas")
    console.log("Modifier la variable base")
    process.exit(0)
}

module.exports = {
    base : base,
    port_http : port_http,
    private_key : private_key,
}
