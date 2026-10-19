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

getStats();