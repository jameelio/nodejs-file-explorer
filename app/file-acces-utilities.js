const fs = require('fs');
const path = require('path');

/**
 * This function gets file/directory statistics using fs.stat
 * @param {*} dir String path too file or location
 * @returns object containing file/directory details
 */

function getLocationStats(dir){
   return new Promise((resolve,reject)=>{
        fs.stat(dir,(err,stats)=>{
            if(err){
               return reject(err);
            }
             return resolve ({
                isFile: stats.isFile(),
                isDir: stats.isDirectory(),
                isSymbolicLink: stats.isSymbolicLink(),
                size: stats.size,
                modified: stats.ctime,
                created: stats.mtime,
                type: path.extname(dir),

            });
        });
    });
}

function checkContentsInDir(loc){
    return new Promise((resolve,reject)=>{
        fs.readdir(loc,(err,stats)=>{
            err ? reject(err): resolve(stats);
        })
    })
}

async function getLocationDetails(loc){
   const entitiesInLocation = await checkContentsInDir(loc);
   return await Promise.all(
    entitiesInLocation.map(async location => {
        const {
         isFile,
         isDir,
         isSymbolicLink,
         size,
         modified,
         created,
         type
        } = await getLocationStats(`${loc}/${location}`);
     return {
         isFile,
         isDir,
         isSymbolicLink,
         size,
         modified,
         created,
         type,
         path: `${loc}/${location}`
     }
    })
   ) 
}
module.exports = {
    getLocationStats,
    checkContentsInDir,
    getLocationDetails
}