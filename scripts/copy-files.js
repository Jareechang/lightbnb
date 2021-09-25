const fse = require('fs-extra');
const _ = require('lodash');

function copyFiles(src, dest, options) {
    const recursive = _.get(options, 'recursive', false);
    fse.ensureDir(dest)
        .then(() => {
            fse.copy(src, dest)
                .catch(err => console.log('fse.cp failed: ', err));
        })
        .catch(err => console.error('fse.ensureDir failed : ', err));
}

module.exports = copyFiles;
