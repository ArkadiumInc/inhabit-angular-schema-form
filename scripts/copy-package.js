const fs = require('fs');
const path = require('path');
const package = require('../package.json');

package.peerDependencies = package.dependencies;
package.dependencies = {};

fs.writeFile( path.resolve('./dist/package.json')
            , JSON.stringify(package, null, '  ')
            , err => console.log(err || path.resolve('./dist/package.json') + " written...")
            )