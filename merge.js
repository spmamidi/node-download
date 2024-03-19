
const config = require('./links.js').configuration;
const fsExtra = require('fs-extra');
const merge = require('easy-pdf-merge');
const shell = require('shelljs');
const download = require('download');
(async function () {
    let resultFiles = [];
    const destinationPath = `${config.destinationPath}`;


    for (let index = 0; index < 6; index++) {
        const fileIndex = index + 1;// * 100 + 1;
        const fileName = `${destinationPath}/${fileIndex}.pdf`;
        resultFiles.push(fileName);
    }

    console.log('merge all called', resultFiles.length, resultFiles[0]);

    merge(resultFiles, config.destinationPath + '/all.pdf', function (err) {
        if (err) {
            return console.log(err, config.destinationPath + '/all.pdf');
        }
    });
    console.log('Success');

})();

function mergeFilePromise(resultFiles, areaConsolidatedPath) {
    return new Promise((resolve, reject) => {
        if (resultFiles.length < 2) {
            resolve(true);
            return;
        }
        merge(resultFiles, areaConsolidatedPath, function (err) {
            if (err) {
                //return console.log(err, areaConsolidatedPath);
                resolve(false);
            }
            else {
                resolve(true);

            }
        });
    })

}



