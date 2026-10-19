const os = require('os');
const bytes = require('bytes');

async function getStats() {
    try{

        const total_mem_b = os.totalmem();
        const free_mem_b = os.freemem();
        const used_mem_b = total_mem_b - free_mem_b

        const total_mem = bytes.format(total_mem_b);
        const free_mem = bytes.format(free_mem_b);
        const used_mem = bytes.format(used_mem_b);

        console.log(`===== STATS DU PC =====`);
        console.log(`Mémoire total : ${total_mem}\nMémoire utilisée : ${used_mem}\nMémoire disponible : ${free_mem}`);
        

    } catch (e) {
        console.log(`Oops, une erreur est survenue\nCode erreur :`);
        
    }
} 

getStats();