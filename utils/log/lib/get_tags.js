const path = require('path')
const getPackage = require('@pw/lib/get_package')

module.exports = mod => {
    const currentPackage = getPackage(mod)
    const basepath = currentPackage ? currentPackage.pathPackage : process.mainModule.path
    const filename = mod && mod.filename ? mod.filename : ''
    const rel = filename.replace(basepath, '')
    const tags = rel.replace(/^\//, '').split('/')

    if (currentPackage) {
        tags.unshift(currentPackage.name)
    }

    if (tags[tags.length - 1] == 'index.js') tags.pop()

    return {
        tags,
        filename,
        name: currentPackage ? currentPackage.name : null,
    }
}
