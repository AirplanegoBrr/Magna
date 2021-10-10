const fs = require('fs');
var rawdata = require('./data.json');

async function load(){
    rawdata = require('./data.json');
}

async function get(guildID, dataName){
    await load();
    return rawdata.servers[guildID][dataName] || null;
}
async function getAll(guildID){
    await load();
    return rawdata.servers[guildID];
    
}
async function make(guildID){
    await load();
    if (!rawdata.servers[guildID]){
        rawdata.servers[guildID] = {};
    }
    await save(guildID);
}
async function save(guildID, dataName, data){
    await load();
    rawdata.servers[guildID][dataName] = data;
    fs.writeFileSync('./data.json', JSON.stringify(rawdata));
}
async function saveAll(){
    fs.writeFileSync('./data.json', JSON.stringify(rawdata));
}



module.exports = {
    get: get,
    save: save,
    getAll: getAll,
    saveAll: saveAll,
    make: make
}