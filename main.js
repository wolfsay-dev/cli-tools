#!/usr/bin/env node
const os = require('os');
const bytes = require('bytes');
const fs = require('fs/promises');
const errors_library = require('./errors.json');

async function getStats() {
    try{

        ////////////////////////////// MEMORY ////////////////////////
        const total_mem_b = os.totalmem();
        const free_mem_b = os.freemem();
        const used_mem_b = total_mem_b - free_mem_b

        const total_mem = bytes.format(total_mem_b);
        const free_mem = bytes.format(free_mem_b);
        const used_mem = bytes.format(used_mem_b);

         ////////////////////////////// CPU ////////////////////////
         const cpu = os.cpus();
         
         const cpu_model = cpu[0].model;
         const cpu_speed = cpu[0].speed;

         
         
         
          ////////////////////////////// Operating Sys ////////////////////////
          const uptime_b = os.uptime() 
          const plateform = os.platform()
          const type = os.type()
          const version = os.release()

          const uptime = `${Math.round(uptime_b / 60)} minutes`;
          

    /////////////////////////////////////////////////////////////////////

        console.log(`================= STATS DU PC =================`);
        console.log(`===== OS =====`);
        console.log(`Système d'exploitation : ${type}, ${version}\nPlateforme : ${plateform}\nLancé depuis : ${uptime}`);
        console.log(`===== Hardware =====`);
        console.log(`Processeur : ${cpu_model}\nVitesse actuelle (MHz): ${cpu_speed}\n\n Mémoire total : ${total_mem}\nMémoire utilisée : ${free_mem}\nMémoire disponible : ${used_mem}`);
        console.log(`==============================================`);
        console.log(`\n © CLI TOOLS - 2026`);
        
        
        
        
        
        
        

    } catch (e) {
       const errorData = errors_library.find(data => data.name === e.code)

         if (errorData) {

         const errorCode = errorData.internal_id;
        const heure = new Date().toTimeString().slice(0, 8);
         console.log(`Oops, une erreur innatendue s'est produite :/\n\n====INFORMATIONS TECHNIQUES====\n Code erreur : ${errorCode}\nHeure d'évènement : ${heure}`);
    
         const nice_error = JSON.stringify(e);
         const log_error = `- ERREUR ${errorCode} du ${heure} :\n\n${nice_error}\n`
         await fs.appendFile('errors.log', log_error, 'utf-8');

            } else {
         console.log(`Oops, une erreur innatendue s'est produite :/\n\nImpossible de trouver le code erreur. Voici l'erreur brute :\n===\n\n`, e)
            }

        
    }
} 

async function help() {
    try {

        console.log(`========== COMMANDES DISPONIBLES ==========`);
        console.log(`tools start => Exécute le programme d'analyse de l'ordinateur`);
        console.log(`tools help => Obtenir de l'aide`);
        console.log(`tools error [CODE] => Permet d'obtenir l'erreur complète d'après un code erreur`);

    } catch (e) {
         const errorData = errors_library.find(data => data.name === e.code)

         if (errorData) {

         const errorCode = errorData.internal_id;
        const heure = new Date().toTimeString().slice(0, 8);
         console.log(`Oops, une erreur innatendue s'est produite :/\n\n====INFORMATIONS TECHNIQUES====\n Code erreur : ${errorCode}\nHeure d'évènement : ${heure}`);
    
         const nice_error = JSON.stringify(e);
         const log_error = `- ERREUR ${errorCode} du ${heure} :\n\n${nice_error}\n`
         await fs.appendFile('errors.log', log_error, 'utf-8');

            } else {
         console.log(`Oops, une erreur innatendue s'est produite :/\n\nImpossible de trouver le code erreur. Voici l'erreur brute :\n===\n\n`, e)
            }

    }
}

async function errorCode() {
    try {

        const code = process.argv[3];
        const error = errors_library.find(data => data.internal_id === code)

        const name = error.name
        const level = error.level
        const explanation = error.explanation
        const fix = error.fix 

        console.log(`========== RAPPORT D'ERREUR ==========`);
        console.log(`\nCode erreur : ${code}`)
        console.log(`\nNom de l'erreur : ${name}\nNiveau : ${level}\nExplication de l'erreur : ${explanation}\nVoici comment vous pourriez la résoudre : ${fix}`);
        console.log(`\n==== © CLI TOOLS - 2026`);
        
        
        
        
    } catch (e) {
          const errorData = errors_library.find(data => data.name === e.code)

         if (errorData) {

         const errorCode = errorData.internal_id;
        const heure = new Date().toTimeString().slice(0, 8);
         console.log(`Oops, une erreur innatendue s'est produite :/\n\n====INFORMATIONS TECHNIQUES====\n Code erreur : ${errorCode}\nHeure d'évènement : ${heure}`);
    
         const nice_error = JSON.stringify(e);
         const log_error = `- ERREUR ${errorCode} du ${heure} :\n\n${nice_error}\n`
         await fs.appendFile('errors.log', log_error, 'utf-8');

            } else {
         console.log(`Oops, une erreur innatendue s'est produite :/\n\nImpossible de trouver le code erreur. Voici l'erreur brute :\n===\n\n`, e)
            }
    }
}


if (!process.argv[2]) {

    console.log(`========== CLI TOOLS ==========`);
    console.log(`Bienvenue dans l'outil CLI TOOLS`);
    console.log(`Effectuez la commande "tools help" pour commencer`);
     console.log(`\n==== © CLI TOOLS - 2026`);  
} else if (process.argv[2] === `start`) {

    getStats();

} else if (process.argv[2] === 'help') {
    help();
} else if (process.argv[2] === 'error' && !process.argv[3]) {
    console.log(`Merci de renseigner un code d'erreur`);
    
} else if (process.argv[2] === 'error' && process.argv[3]) { 
    errorCode();
}