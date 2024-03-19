
const config = require('./links.js').configuration;
const fsExtra = require('fs-extra');
const merge = require('easy-pdf-merge');
const shell = require('shelljs');
const download = require('download');
(async function () {
    let links = config.links.filter(item => item.indexOf('.pdf')> -1);
    let resultFiles = [];
    const destinationPath = `${config.destinationPath}`;
    if (!fsExtra.existsSync(destinationPath)) {
        shell.mkdir('-p', destinationPath);
    }
    
    await links.reduce(async (previousePromise, linkItem, index) => {
        //console.log(order.name);
        const collection = await previousePromise;
        const fileIndex = index + 1;// * 100 + 1;
        await download(linkItem).then(data => {
            const fileName = `${destinationPath}/${fileIndex}.pdf`;
            resultFiles.push(fileName);
            //console.log('file pushed', fileName);
            fsExtra.writeFileSync(fileName, data);
        });
        return collection;
    }, Promise.resolve([]));

    console.log('merge all called');
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



